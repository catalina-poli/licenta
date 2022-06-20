import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategorieSablonService } from '../categorie-sablon.service';
import { FileUploadDownloadService } from '../file-upload-download.service';
import { CategorieSablonModel } from '../model/categorie-sablon';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../services/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export class DynamicFlatNode {
  constructor(
    public item: CategorieSablonModel,
    public level = 1,
    public expandable = false,
    public isLoading = false,
  ) { }
}

export class DynamicFlatNodeSablon {
  constructor(
    public item: CategorieSablonModel,
    public level = 1,
    public expandable = false,
    public isLoading = false,
  ) { }
}

@Injectable({ providedIn: 'root' })
export class DynamicDatabase {




  dataMapTest = new Map<CategorieSablonModel, CategorieSablonModel[]>(

  );

  dataMap = new Map<CategorieSablonModel, CategorieSablonModel[]>([


  ]);


  rootLevelNodes: CategorieSablonModel[] = [
  ];

  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true)); // TODO: modify 'name'
  }

  getChildren(node: CategorieSablonModel): CategorieSablonModel[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: CategorieSablonModel): boolean {
    return this.dataMap.has(node);
  }
}

export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _database: DynamicDatabase,
    private serviceCategoriiSabloane: CategorieSablonService

  ) {
  }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {


    this._treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void { }

  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }


  toggleNode(node: DynamicFlatNode, expand: boolean) {
    console.log('TOGGLING NODE: ', node);
    this.serviceCategoriiSabloane.findAllCategoriiSablonChildrenForParent(node.item.id)
      .subscribe(
        rez => {
          console.log('categorii children: ', rez);
          const children = rez;// this._database.getChildren(node.item);
          const index = this.data.indexOf(node);
          if (!children || index < 0) {
            // If no children, or cannot find the node, no op
            return;
          }

          node.isLoading = true;

          setTimeout(() => {
            if (expand) {
              const nodes = children.map(
                nodul => new DynamicFlatNode(nodul, node.level + 1, nodul.file ? false : true), //  this._database.isExpandable(name)
              );
              this.data.splice(index + 1, 0, ...nodes);
            } else {
              let count = 0;
              for (
                let i = index + 1;
                i < this.data.length && this.data[i].level > node.level;
                i++, count++
              ) { }
              this.data.splice(index + 1, count);
            }

            // notify the change
            this.dataChange.next(this.data);
            node.isLoading = false;
          }, 450);
        },
        err => {
          console.log(err);
        }
      );

  }
}


@Component({
  selector: 'app-sabloane',
  templateUrl: './sabloane.component.html',
  styleUrls: ['./sabloane.component.css']
})

export class SabloaneComponent implements OnInit {


  newCategoryName: string = '';
  parentId?: number;
  newDocumentType: string = '';
  newDocumentName: string = '';
  fileName = '';
  allCategorii: CategorieSablonModel[] = [];
  categorieNoua: CategorieSablonModel = new CategorieSablonModel();

  fileToUpload: File | null = null;

  onFileSelected(event: any) {

    this.fileToUpload = event.target.files[0];

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  
  saveSablonNou() {
    if(!this.categorieNoua.categoryName){
      this.openSnackBar('Completati datele pentru a adauga o noua CATEGORIE!', 'Close');
      return;
    }
    this.categoriiSablonService.saveSablonNou(this.categorieNoua)
      .subscribe(
        rez => {
          console.log('saved: ', rez);
          this.openSnackBar('Categorie adaugata cu succes!', 'Close');

        },
        err => {
          console.log(err);
          this.openSnackBar('Could not add category', 'Close');
        }
      );
  }

  // upload sablon (ADMIN)

  uploadFile() {
   

    console.log('save file');
    this.fileService.uploadFile(this.fileToUpload, `http://localhost:8080/uploadFile-sablon/${this.newCategoryName}/${this.parentId}`)

  }

  saveSablon() {
   
    if(!this.newCategoryName){
      this.openSnackBar('Completati datele pentru a adauga un nou SABLON!', 'Close');
      return;
    }
    console.log('saving sablon: ', this.fileToUpload);
    this.uploadFile();
    //this.openSnackBar('Salvare cu succes a sablonului!', 'Close');

  }


  constructor(database: DynamicDatabase,        
    private categoriiSablonService: CategorieSablonService,
    private fileService: FileService,
    private _snackBar: MatSnackBar) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database, categoriiSablonService);
    
    // this.dataSource.data = database.initialData();
  }

  ngOnInit(): void {

    this.categoriiSablonService.findAllCategoriiDropdown()
      .subscribe(
        rez => {
          this.allCategorii = rez;
        },
        err => {
          console.log(err);
        }
      );


    this.categoriiSablonService.findAllCategoriiSablonRadacina()
      .subscribe(
        categoriiRadacina => {
          console.log('categorii root: ', categoriiRadacina);
          const data = this.dataSource.data;
          let noduri = categoriiRadacina.map(x => new DynamicFlatNode(x, 0, true));
          for (let nod of noduri) {
            data.push(nod);
          }
          this.dataSource.data = data;
          // this.dataSource.data = database.initialData();
        },
        err => {
          console.log('eroare incarcare categorii root: ', err);
        }
      );
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  downloadSablon(idSablon: number){
    this.fileService.downloadSablon(idSablon);
  }


}


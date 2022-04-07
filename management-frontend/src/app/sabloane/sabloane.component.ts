import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { CategorieSablonService } from '../categorie-sablon.service';
import { CategorieSablonModel } from '../model/categorie-sablon';


export class DynamicFlatNode {
  constructor(
    public item: CategorieSablonModel,
    public level = 1,
    public expandable = false,
    public isLoading = false,
  ) {}
}

export class DynamicFlatNodeSablon {
  constructor(
    public item: CategorieSablonModel,
    public level = 1,
    public expandable = false,
    public isLoading = false,
  ) {}
}

@Injectable({providedIn: 'root'})
export class DynamicDatabase {


  // dataMap = new Map<CategorieSablonModel, CategorieSablonModel[]>([
  //   [{ id: 1, categoryName: 'Modele rapoarte BATALION', categorieParinte: '' },
  //   [{ id: 2, categoryName: 'Modele rapoarte BATALIO 222', categorieParinte: '' }]
  //   ]);

  dataMapTest = new Map<CategorieSablonModel, CategorieSablonModel[]>(
    
  );
  
  dataMap = new Map<CategorieSablonModel, CategorieSablonModel[]>([
   
    
  ]);
  // ['Modele rapoarte BATALION', ['INVOIRE', 'PERMISIE', 'MEDICALA']],
  // ['INVOIRE', ['PARASIRE GARNIZOANA','IN GARNIZOANA BUCURESTI']],
  // ['IN GARNIZOANA BUCURESTI', ['IN TIMPUL PROGRAMULUI UNIVERSITAR','DUPA PROGRAMUL UNIVERSITAR']],
  // ['PARASIRE GARNIZOANA', ['IN TIMPUL PROGRAMULUI UNIVERSITAR','DUPA PROGRAMUL UNIVERSITAR']],
  // ['PERMISIE', ['IN TIMPUL PROGRAMULUI UNIVERSITAR','DUPA PROGRAMUL UNIVERSITAR']],
  // ['MEDICALA', ['IN TIMPUL PROGRAMULUI UNIVERSITAR','DUPA PROGRAMUL UNIVERSITAR']],
  // ['Modele rapoarte UNIVERSITARE', ['REEXAMINARE', 'ADEVERINTA STUDENT', 'BURSA']],
  // ['BURSA', ['.']],
  // ['REEXAMINARE', ['.']],
  // ['ADEVERINTA STUDENT', ['.']],
  // ['Modele rapoarte DE INTERES GENERAL',['PARASIRE TARA','CONCEDIU','REVENDICARE LAPTOP','SCOATERE LAPTOP DIN GARNIZOANA','INTRODUCERE LAPTOP IN UNITATE']],
  // ['PARASIRE', ['.']],
  // ['CONCEDIU', ['.']],
  // ['REVENDICARE LAPTOP', ['.']],   
  // ['SCOATERE LAPTOP DIN GARNIZOANA', ['.']],    
  // ['INTRODUCERE LAPTOP IN UNITATE', ['.']],
  // ['PARASIRE TARA', ['.']],

  rootLevelNodes: CategorieSablonModel[] = [
    // { id: 1, categoryName: 'ROOT 1', categorieParinte: null },
    // { id: 1, categoryName: 'ROOT 2', categorieParinte: null }
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
    private _database: DynamicDatabase
    
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

  disconnect(collectionViewer: CollectionViewer): void {}

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
    const children = this._database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) {
      // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(
          name => new DynamicFlatNode(name, node.level + 1, this._database.isExpandable(name)),
        );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 450);
  }
}


 @Component({
  selector: 'app-sabloane',
  templateUrl: './sabloane.component.html',
  styleUrls: ['./sabloane.component.css']
})

export class SabloaneComponent implements OnInit{
  constructor(database: DynamicDatabase,
    private categoriiSablonService: CategorieSablonService) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    // this.dataSource.data = database.initialData();


    
  }
   ngOnInit(): void {


  

     this.categoriiSablonService.findAllCategoriiSablonRadacina()
      .subscribe(
        categoriiRadacina => {
          console.log('categorii root: ', categoriiRadacina);
          const data = this.dataSource.data;
          let noduri = categoriiRadacina.map(x => new DynamicFlatNode(x, 0, true)); 
          for(let nod of noduri){
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
}


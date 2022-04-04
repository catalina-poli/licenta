import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';


export class DynamicFlatNode {
  constructor(
    public item: string,
    public level = 1,
    public expandable = false,
    public isLoading = false,
  ) {}
}


@Injectable({providedIn: 'root'})
export class DynamicDatabase {
  dataMap = new Map<string, string[]>([
    ['Modele rapoarte BATALION', ['INVOIRE', 'PERMISIE', 'MEDICALA']],
    ['INVOIRE', ['PARASIRE GARNIZOANA','IN GARNIZOANA BUCURESTI']],
    ['IN GARNIZOANA BUCURESTI', ['IN TIMPUL PROGRAMULUI UNIVERSITAR','DUPA PROGRAMUL UNIVERSITAR']],
    ['PARASIRE GARNIZOANA', ['IN TIMPUL PROGRAMULUI UNIVERSITAR','DUPA PROGRAMUL UNIVERSITAR']],
    ['PERMISIE', ['IN TIMPUL PROGRAMULUI UNIVERSITAR','DUPA PROGRAMUL UNIVERSITAR']],
    ['MEDICALA', ['IN TIMPUL PROGRAMULUI UNIVERSITAR','DUPA PROGRAMUL UNIVERSITAR']],
    ['Modele rapoarte UNIVERSITARE', ['REEXAMINARE', 'ADEVERINTA STUDENT', 'BURSA']],
    ['BURSA', ['.']],
    ['REEXAMINARE', ['.']],
    ['ADEVERINTA STUDENT', ['.']],
    ['Modele rapoarte DE INTERES GENERAL',['PARASIRE TARA','CONCEDIU','REVENDICARE LAPTOP','SCOATERE LAPTOP DIN GARNIZOANA','INTRODUCERE LAPTOP IN UNITATE']],
    ['PARASIRE', ['.']],
    ['CONCEDIU', ['.']],
    ['REVENDICARE LAPTOP', ['.']],   
    ['SCOATERE LAPTOP DIN GARNIZOANA', ['.']],    
    ['INTRODUCERE LAPTOP IN UNITATE', ['.']],
    ['PARASIRE TARA', ['.']],
    
  ]);

  rootLevelNodes: string[] = ['Modele rapoarte BATALION', 'Modele rapoarte UNIVERSITARE','Modele rapoarte DE INTERES GENERAL'];

  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
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
  ) {}

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
    }, 1000);
  }
}


 @Component({
  selector: 'app-sabloane',
  templateUrl: './sabloane.component.html',
  styleUrls: ['./sabloane.component.css']
})

export class SabloaneComponent{
  constructor(database: DynamicDatabase) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.dataSource.data = database.initialData();
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
}


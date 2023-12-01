export class Guild {
  id: string;
  parentId: string;
  archiveId: string;

  constructor(id: string, parentId: string, archiveId: string) {
    this.id = id;
    this.parentId = parentId;
    this.archiveId = archiveId;
  }
}

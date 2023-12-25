export class Guild {
    id: string;
    parentId: string;
    archiveId: string;
    adventureRoleId: string;
    completedAdventureRoleId: string;

    constructor(id: string, parentId: string, archiveId: string, adventureRoleId: string, completedAdventureRoleId: string) {
        this.id = id;
        this.parentId = parentId;
        this.archiveId = archiveId;
        this.adventureRoleId = adventureRoleId;
        this.completedAdventureRoleId = completedAdventureRoleId;
    }
}

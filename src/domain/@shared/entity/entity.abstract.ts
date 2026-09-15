import Notification from "../notification/notification";

export default abstract class Entity {
    protected _id: string;
    protected notification: Notification;

    constructor(id: string) {
        this._id = id;
        this.notification = new Notification();
    }

    getId(): string {
        return this._id
    }
}

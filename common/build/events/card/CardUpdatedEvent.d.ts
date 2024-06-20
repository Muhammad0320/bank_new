import { Settings } from "../../types/CardFieldTypes";
import { Subjects } from "../Subjects";
export interface CardUpdatedEvent {
    subject: Subjects.CardUpdated;
    data: {
        settings: Settings;
    };
}

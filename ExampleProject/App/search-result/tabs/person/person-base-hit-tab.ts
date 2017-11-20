import {BaseHitTab} from "../base-hit-tab";
import {RegisterPerson} from "../../../models/DataModels";
import {RegisterNames} from "../../../resources/app-settings";

export abstract class PersonBaseHitTab extends BaseHitTab<RegisterPerson> {
    
    protected getLatestJsonContent(register: string) {
        switch (register) {
        case RegisterNames[RegisterNames.Preg]:
            return this.item.detail.pregJson;
        case RegisterNames[RegisterNames.Hpr]:
            return this.item.detail.hprJson;
        case RegisterNames[RegisterNames.FlrDoctor]:
            return this.item.detail.fastlegeJson;
        case RegisterNames[RegisterNames.FlrPasient]:
            return this.item.detail.fastlegePasientJson;
        default:
            return "";
        }
    }
}


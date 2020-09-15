import React from 'react';
import {create} from 'react-test-renderer';
import ProfileStatusContainer, {ProfileStatus} from "./ProfileStatus";
import {getProfileStatusThunkCreator} from "../../../../redux/profileReducer";


describe("ProfileStatus component", () => {
    test("Status from props should be in state", () => {
        const component = create(<ProfileStatus status={'it-kamasutra'} getStatus={getProfileStatusThunkCreator}/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("it-kamasutra");
    });
});

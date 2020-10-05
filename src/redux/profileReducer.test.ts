import profileReducer, {addPost, deletePost} from "./profileReducer";
import React from "react";


// Test data

let state = {
    profile: {
        postsData: [
            {id: 1, text: 'Hi, how are you', likesCount: 12},
            {id: 2, text: 'my first post', likesCount: 10},
        ],
    },
}



test('length of posts should be incremented', () => {
    let action = addPost('it-kamasutra')

    // Action
    let newState = profileReducer(state, action);

    // Expectation
    expect(newState.profile.postsData.length).toBe(3);
});

test('after deleting length should be decremented', () => {
    let action = deletePost(1)

    // Action
    let newState = profileReducer(state, action);

    // Expectation
    expect(newState.profile.postsData.length).toBe(1);
});




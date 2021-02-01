import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from './styles';
import { updateProfileRequest } from '../../store/module/user/actions';
import { signOut } from '../../store/module/auth/actions';
import AvatarInput from './AvatarInput/index';

function Profile() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.user.profile)
    
    function handleSubmit(data){
        dispatch(updateProfileRequest(data));
    }

    function handleSignOut(){
        dispatch(signOut())
    }
    
    return (
        <Container>
            <Form initialData={data} onSubmit={handleSubmit}>
                <AvatarInput name="avatar_id" />

                <Input name="name" placeholder="Surname" />
                <Input name="email" placeholder="your e-mail" />

                <hr/>

                <Input type="password" name="oldPassword" placeholder="Your current password" />
                <Input type="password" name="password" placeholder="New password" />
                <Input type="password" name="confirmPassword" placeholder="Confirm new password" />
            
                <button type="submit">Update profile</button>
            </Form>

            <button type="button" onClick={handleSignOut}>Get out of Gobarber</button>
        </Container>
    )
}

export default Profile;

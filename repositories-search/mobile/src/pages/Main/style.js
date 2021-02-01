import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';


export const Container = styled.View`
    flex: 1;
    padding: 30px 20px;
    background: #fff;
`;


export const Form = styled.View`
    flex-direction: row;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#999',
})`
    flex: 1;
    border: 1px solid #eee;
    border-radius: 4px;
    background: #eee;
    padding: 0 16px;
    height: 40px;

`;

export const SubmitButton = styled(RectButton)`
    background: #7159c1;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    padding: 0 12px;
    opacity: ${ props => (props.loading ? 0.6 : 1)}
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false
})`
    margin-top: 20px;
`;

export const User = styled.View`
    align-items: center;
    margin: 0 20px 30px;
`;

export const Name = styled.Text`
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    color: #333;
    margin-top: 4px;
`;

export const Bio = styled.Text.attrs({
    numberOfLines: 2,
})`
    text-align: center;
    color: #999;
    font-size: 13px;
    line-height: 18px;
    margin-top: 5px;
`;

export const Avatar = styled.Image`
    border-radius: 32px;
    border-color: #999;
    height: 62px;
    width: 62px;
`;

export const ProfileButton = styled(RectButton)`
    background: #7159c1;
    justify-content: center;
    align-items: center;
    height: 36px;
    border-radius: 4px;
    align-self: stretch;
    margin-top: 5px;
`;

export const ProfileButtonText = styled.Text`
    text-transform: uppercase;
    color: #FFF;
    font-weight: bold;
    font-size: 14px;
`;


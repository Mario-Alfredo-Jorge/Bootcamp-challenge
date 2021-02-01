import styled from 'styled-components/native';


export const Container = styled.View`
    padding: 20px;
    flex: 1;
`;

export const Header = styled.View`
    align-items: center;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-color: #eee;

`;

export const Avatar =  styled.Image`
    background: #999;
    height: 100px;
    width: 100px;
    border-radius: 50px;
`;

export const Name = styled.Text`
    font-size: 20px;
    color: #333;
    font-weight: bold;
    margin-top: 10px;
    align-items: center;
`;

export const Bio = styled.Text`
    font-size: 14px;
    line-height: 18px;
    color: #999;
    align-items: center;
    margin-top: 5px;
    text-align: center;
`;

export const Stars = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    margin-top: 20px;
`;

export const Starred = styled.View`
    background: #f5f5f5;
    border-radius: 4px;
    padding: 10px 15px;
    margin-bottom: 20px;
    align-items: center;
    flex-direction: row;
`;

export const OwnerAvatar = styled.Image`
    height: 50px;
    width: 50px;
    border-radius: 50px;
    background: #333;
`;

export const Info = styled.View`
    margin-left: 10px;
    flex: 1;
`;

export const Title = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-size: 15px;
    font-weight: bold;
    color: #333;
`;

export const Author = styled.Text`
    font-size: 13px;
    color: #666;
    margin-top: 2px;
`;

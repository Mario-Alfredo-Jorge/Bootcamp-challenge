import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { Form, SubmitButton, List } from './style'
import Container from '../../components/index'

class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,

    }

    componentDidMount(){
        const repositories = localStorage.getItem('repositories')

        if(repositories)
            this.setState({ repositories: JSON.parse(repositories) })
    }

    componentDidUpdate(_, prevState){

        const { repositories } = this.state

        if(prevState.repositories !== repositories)
            localStorage.setItem('repositories', JSON.stringify(repositories))

    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({ loading: true })

        const { newRepo } = this.state;

        const response = await api.get(`/repos/${newRepo}`)

        const data ={
                name: response.data.full_name,
            }

        this.setState(
            {
                repositories: [...this.state.repositories, data],
                newRepo: '',
                loading: false
            }
        )
    }

  render(){
      const { newRepo, loading, repositories } = this.state
    return(
        <Container>

            <h1>
                <FaGithubAlt />
                Repositories
            </h1>

            <Form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Add repository"
                    value={newRepo}
                    onChange={this.handleInputChange}
                />

                <SubmitButton loading={loading}>
                    {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                </SubmitButton>
            </Form>

            <List>
                { repositories.map(repository => (
                    <li key={repository.name}>
                        <span>{repository.name}</span>
                        <Link to={`repository/${encodeURIComponent(repository)}`}>Detalhes</Link>
                    </li>
                ))}
            </List>
        </Container>
    )
  }
}

export default Main;

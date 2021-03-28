import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default class Perfil extends Component {

    // atributo do component
    state = {
        nome: '',
        foto: '',
        repos: '',
        ultimoRepo: '',
        seguidores: '',
        seguindo: '',
        user: ''
    }

    loadData = async (usuario) => {
        const responseUser = await api.get('/' + usuario)
        const user = responseUser.data;

        const responseRepos = await api.get('/' + usuario + '/repos')
        const repos = responseRepos.data;

        this.setState({
            nome: user.name,
            foto: user.avatar_url,
            repos: user.public_repos,
            ultimoRepo: repos[0].description,
            seguidores: user.followers,
            seguindo: user.following
        })
    }

    handleUser = (text) => {
        this.setState({ user: text })
    }

    handleButton = () => {
        this.loadData(this.state.user)
    }

    render() {
        const pic = {
            uri: this.state.foto
        }

        return (
            <View style={styles.container}>
                <Image style={styles.foto} source={pic} />
                <Text style={styles.nome}>{this.state.nome}</Text>


                <View style={styles.infoCont}>
                    <View style={styles.infoItems}>
                        <Text style={styles.infoText}>{this.state.seguidores}</Text>
                        <Text style={styles.header}>Seguidores</Text>
                    </View>
                    <View style={styles.infoItems}>
                        <Text style={styles.infoText}>{this.state.seguindo}</Text>
                        <Text style={styles.header}>Seguindo</Text>
                    </View>
                    <View style={styles.infoItems}>
                        <Text style={styles.infoText}>{this.state.repos}</Text>
                        <Text style={styles.header}>Repositórios</Text>
                    </View>
                </View>

                <View style={styles.repoText} >
                    <Text style={styles.header}>Último repositório:</Text>
                    <Text>{this.state.ultimoRepo}</Text>
                </View>

                <View style={styles.search}>
                    <TextInput style={styles.TextInput} onChangeText={this.handleUser} clearButtonMode="always"></TextInput>
                    <TouchableOpacity style={styles.button} onPress={this.handleButton} >
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    foto: {
        width: 180,
        height: 180,
        borderRadius: 100,
        marginBottom: 5
    },
    nome: {
        fontFamily: 'arial',
        fontSize: '1.5em',
        color: '#2b2d36',
        fontWeight: 'bold'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 100
    },
    TextInput: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 40,
        border: '2px solid',
        padding: 10,
        fontSize: '1.2em',
        width: '80%',
        color: '#7d7e84',
    },
    button: {
        backgroundColor: '#2d3239',
        padding: 15,
        margin: 15,
        height: 50,
        width: '20%',
        borderRadius: 100,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff'
    },
    infoCont: {
        flexDirection: 'row',
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    infoItems: {
        marginHorizontal: 20,
        alignItems: 'flex-start'
    },
    infoText: {
        margin: 5,
        fontSize: '1.2em',
        fontWeight: 'bold'
    },
    repoText: {
        width: '100%',
    },
    header: {
        fontWeight: 'bold',
        color: '#7d7e84',
        margin: 5
    }
});
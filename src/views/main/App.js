import React, { Component } from 'react';
import './App.css';
import ApiService from '../../api/api_service.js';
import SyncIcon from '@material-ui/icons/Sync';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import GridList from '@material-ui/core/GridList';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridListTile from '@material-ui/core/GridListTile';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import DialogContentText from '@material-ui/core/DialogContentText';

let users_aux = [];
let currentUsers = [];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            open: false,
            openDialog: false,
            name: "",
            lastName: "",
            occupation: "",
            lastId: 0,
            perPage: 9,
            currentPage: 1,
            pageOfItems: [],
        }

        this.tabPageClick = this.tabPageClick.bind(this);
    }

    componentWillMount = async () => {
        if(localStorage.getItem('users') !== null){
            await this.setState({
                users: JSON.parse(localStorage.getItem('users')),
                lastId: JSON.parse(localStorage.getItem('users')).length
            });
        } else {
            try {
                let result = await ApiService.getUsers();
                let users = result.data.data;

                for (let i = 0; i < users.length; i++) {
                    users[i].name = users[i].first_name + ' ' + users[i].last_name;
                    users[i].occupation = 'Exemplo'
                }

                await this.setState({
                    initialUsers: result.data.data,
                    users: result.data.data,
                    lastId: users.length
                });
            } catch (e) {
                throw e
            }
        }
    };

    tabPageClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    };

    onChangeName = (event) => {
        this.setState({ name: event.target.value });
    };

    onChangeLastName = (event) => {
        this.setState({ lastName: event.target.value });
    };

    onChangeOccupation = (event) => {
        this.setState({ occupation: event.target.value });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            this.setState({ open: false });
        }

        this.setState({ open: false });
    };

    sendInfo = async () => {
        try {
            let postReturn = await ApiService.postUser(this.state.name, this.state.lastName, this.state.lastId);
            await this.setState({ open: true });
            this.clearForm();

            postReturn.data.occupation = this.state.occupation;
            postReturn.data.name = postReturn.data.first_name + ' ' + postReturn.data.last_name;
            users_aux = this.state.users;
            users_aux.push(postReturn.data);
            await localStorage.setItem('users', JSON.stringify(users_aux));

            await this.setState({
                users: JSON.parse(localStorage.getItem('users')),
                lastId: JSON.parse(localStorage.getItem('users')).length
            });
        } catch (e) {
            throw e
        }

    };

    clearForm = () => {
        this.setState({
            name: "",
            lastName: "",
            occupation: ""
        });
    };

    dialogClose = () => {
        this.setState({ openDialog: false });
    };

    dialogAction = () => {
        localStorage.clear();
        this.setState({
            openDialog: false,
            users: this.state.initialUsers
        });
        window.location.reload();
    };

    render() {

        // Logic for displaying users
        let indexOfLast = this.state.currentPage * this.state.perPage;
        let indexOfFirst = indexOfLast - this.state.perPage;
        currentUsers = [];
        currentUsers = this.state.users.slice(indexOfFirst, indexOfLast);

        // Render users
        let renderUsers = currentUsers.map((user, index) => {
            return <GridListTile key={index} style={{textAlign: 'left'}}>
                <img src={user.avatar} alt={user.first_name} />
                <GridListTileBar
                    title={user.name}
                    subtitle={<span>Profissão: {user.occupation}</span>}/>
            </GridListTile>;
        });


        // Logic for displaying page numbers
        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.users.length / this.state.perPage); i++) {
            pageNumbers.push(i);
        }

        // Render page numbers
        let renderPageNumbers = pageNumbers.map(number => {
            return (
                <li key={number} id={number} onClick={this.tabPageClick}>
                    {number}
                </li>
            );
        });

        return (
            <div className="App">
                <div className="row">

                    <IconButton
                        style={styles.iconButtonStyle}
                        aria-label="Resetar"
                        onClick={() =>{this.setState({ openDialog: true })}}>
                        <SyncIcon/>
                    </IconButton>

                    {/*First column*/}
                    <div className="column">
                        <GridList cellHeight={150} cols={3}>
                            <GridListTile key="Subheader" cols={3} style={styles.gridTile}>
                                <ListSubheader component="div">Usuários</ListSubheader>
                            </GridListTile>
                            {renderUsers}
                        </GridList>
                    </div>

                    {/*Second column*/}
                    <div className="column right-column">
                        <div className="header">
                            <p>Criar usuário</p>
                        </div>

                        <form noValidate autoComplete="off">
                            <TextField
                                style={styles.textFieldStyle}
                                id="outlined-name"
                                label="Nome"
                                className=""
                                value={this.state.name}
                                onChange={this.onChangeName.bind(this)}
                                margin="normal"
                                variant="outlined"/>

                            <TextField
                                style={styles.textFieldStyle}
                                id="outlined-name"
                                label="Sobrenome"
                                className=""
                                value={this.state.lastName}
                                onChange={this.onChangeLastName.bind(this)}
                                margin="normal"
                                variant="outlined"/>

                            <TextField
                                style={styles.textFieldStyle}
                                id="outlined-name"
                                label="Profissão"
                                className=""
                                value={this.state.occupation}
                                onChange={this.onChangeOccupation.bind(this)}
                                margin="normal"
                                variant="outlined"/>
                        </form>

                        <br/><br/>

                        {/*Submit button*/}
                        <Button
                            style={styles.buttonStyle}
                            variant="contained"
                            color="primary"
                            onClick={this.sendInfo.bind(this)}>
                            Adicionar
                        </Button>
                    </div>


                    {/*Page numbers*/}
                    <ul className={"page-numbers"}>
                        {renderPageNumbers}
                    </ul>
                </div>

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom',  horizontal: 'center' }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.closeSnackbar}
                    ContentProps={{'aria-describedby': 'message-id',}}
                    message={<span id="message-id">Usuário criado com sucesso</span>}/>

                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Deseja resetar o formulário juntamente com a listagem?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Os registros no localStorage serão apagados e o formulário voltará para o estado inicial.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.dialogClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={this.dialogAction} color="primary" autoFocus>
                            Continuar
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}

const styles = {
    gridTile: { height: 'auto' },
    textFieldStyle: {width: '100%' },
    buttonStyle: {width: '100%' },
    iconButtonStyle: { position: 'absolute', left: '2%', top: '1%', zIndex: 999 }
};

export default App;


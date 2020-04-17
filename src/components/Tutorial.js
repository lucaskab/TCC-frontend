import React from 'react';
import { Text, View} from 'react-native';

export default function Tutorial () {
    return (
        <View style={{ backgroundColor: 'blue', flex: 1}}>
        <Text>Seja bem vindo ao Reporte Já, um aplicativo desenvolvido com o intuito 
                de ser uma forma mais ágil e fácil para comunicação entre a população 
                e os servidores públicos. </Text>
        <Text>Para utiliza-lo é extremamente fácil, para reportar um problema você deve 
            apertar o botão Roxo com o símbolo de +, neste caso, o aplicativo irá pegar sua
            localização atual para cadastrar o problema, se você não estiver no local do problema,
            na tela inicial, você pode buscar pelo endereço do problema, exemplo: Rua Dona Militânia, 241,
            Presidente Prudente, ou tambem arrastar o marcador pelo mapa até o local desejado.
        </Text> 
        <Text>
            Após escolher o método de localização, você poderá escolher entre tirar 5 fotos ou 
            escolher 5 fotos na sua galeria para o seu reporte ser mais completo, após a 5 foto,
            clique no botão para mudar de tela.
        </Text>
        <Text>
            Na ultima tela, você irá selecionar a Área do problema que você deseja reportar,
            no próximo, o nome do problema, depois você poderá fazer uma descrição (O seu ponto
            de vista sobre o problema), as fotos estarão embaixo, após tudo selecionado, você poderá
            apertar o botão e finalizar o seu reporte, que será enviado para o devido responsável pelo
            problema.
        </Text> 
        </View>    
    )
}
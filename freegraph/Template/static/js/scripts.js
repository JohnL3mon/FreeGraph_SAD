// function readCSVFile(){
    // var files = document.querySelector('#file').files;

    // if(files.length > 0 ){
    //     var file = files[0];  // Arquivo selecionado
    //     var reader = new FileReader();  // Objeto FileReader
    //     reader.readAsText(file);  // Ler arquivo como string

    //     reader.onload = function(event) {  // Carregar evento
    //         var csvdata = event.target.result; // Ler dados do arquivo

    //         var rowData = csvdata.split('\n'); // Separar array por quebras de linha
    //         var tbodyEl = document.getElementById('tblcsvdata').getElementsByTagName('tbody')[0];  // <table > <tbody>
    //         tbodyEl.innerHTML = "";

    //         for (var row = 0; row < rowData.length; row++) {  // Loop no array de linha (mudar para row=0 se também quiser ler a primeira linha)
    //             var newRow = tbodyEl.insertRow(); // Criar uma linha no final da tabela
    //             rowColData = rowData[row].split(',');  // Separar array de coluna por vírgula

    //             for (var col = 0; col < rowColData.length; col++) {  // Loop no array de coluna
    //                 var newCell = newRow.insertCell();  // Criar uma célula no final da tabela
    //                 newCell.innerHTML = rowColData[col];

    //                 $.ajax({
    //                     type: "POST",
    //                     url: "{% url 'index' %}",
    //                     data: { csrfmiddlewaretoken: '{{ csrf_token }}', rowData: rowData, colData: colData },  
    //                     success: function callback(response){
    //                         alert(response);
    //                     }
    //                 });
    //             }
    //         }
    //     };
    // }else{
    //     alert("Selecione um arquivo!");
    // }
// }

function readCSVFile(){
    var files = document.querySelector('#file').files;

    if(files.length > 0 ){
        var file = files[0];  // Arquivo selecionado
        var reader = new FileReader();  // Objeto FileReader
        var xhr = new XMLHttpRequest();
    var url = "";
        reader.readAsText(file);  // Ler arquivo como string

        reader.onload = function(event) {  // Carregar evento
            var csvdata = event.target.result; // Ler dados do arquivo

            var rowData = csvdata.split('\n'); // Separar array por quebras de linha
            // var tbodyEl = document.getElementById('tblcsvdata').getElementsByTagName('tbody')[0];  // <table > <tbody>
            // tbodyEl.innerHTML = "";

            for (var row = 0; row < rowData.length; row++) {  // Loop no array de linha (mudar para row=0 se também quiser ler a primeira linha)
                // var newRow = tbodyEl.insertRow(); // Criar uma linha no final da tabela
                rowColData = rowData[row].split(',');  // Separar array de coluna por vírgula

                for (var col = 0; col < rowColData.length; col++) {  // Loop no array de coluna
                    // var newCell = newRow.insertCell();  // Criar uma célula no final da tabela
                    var dados = { dataset: rowColData[col] };
                    // Converta os dados em formato JSON
                    var json = JSON.stringify(dados);

                    // Abra uma solicitação POST assíncrona
                    xhr.open("POST", url, true);

                    // Defina o cabeçalho da solicitação para enviar dados JSON
                    xhr.setRequestHeader("Content-type", "application/json");

                    // Defina a função de retorno de chamada a ser chamada quando a resposta for recebida
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            // Faça algo com a resposta recebida
                            console.log(xhr.responseText);
                        }
                    };

                    // Envie a solicitação com os dados JSON
                    xhr.send(json);
                }
            }
        };
    }else{
        alert("Selecione um arquivo!");
    }/*
    var xhr = new XMLHttpRequest();
    var url = "";

    // Defina os dados que você deseja enviar
    var dados = {
        nome: "João",
        email: "joao@email.com",
        dataset: "a"
    };

    // Converta os dados em formato JSON
    var json = JSON.stringify(dados);

    // Abra uma solicitação POST assíncrona
    xhr.open("POST", url, true);

    // Defina o cabeçalho da solicitação para enviar dados JSON
    xhr.setRequestHeader("Content-type", "application/json");

    // Defina a função de retorno de chamada a ser chamada quando a resposta for recebida
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Faça algo com a resposta recebida
            console.log(xhr.responseText);
        }
    };

    // Envie a solicitação com os dados JSON
    xhr.send(json);*/
}
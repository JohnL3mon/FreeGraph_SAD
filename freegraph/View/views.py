from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import csv

class Dados():
	importados = []
	colunas = []

def index(request):
	try:  # requisição POST (enviar dados à página index.html)
		if request.method == 'POST' and request.FILES['arquivo']:
			arquivo = request.FILES['arquivo']
			fs = FileSystemStorage()
			nome_do_arquivo = fs.save(arquivo.name, arquivo)
			with fs.open(nome_do_arquivo, 'r') as f:
				# Lógica para tratar arquivos .csv
				if nome_do_arquivo.endswith('.csv'):
					dados_importados = csv.reader(f)
					Dados.colunas = next(dados_importados)
					msg = 'Sucesso!'
					msg_cor = 'verde'
					for linha in f:
						Dados.importados.append(linha)

				# Lógica para tratar arquivos .xlsx
				elif nome_do_arquivo.endswith('.xlsx'):
					dados_importados = csv.reader(f)
					Dados.colunas = next(dados_importados)
					msg = 'Sucesso!'
					msg_cor = 'verde'
					for linha in f:
						Dados.importados.append(linha)
				else:
					# Lógica para tratar outros tipos de arquivo aqui
					msg = 'Selecione um arquivo!!!'
					msg_cor = 'vermelho'
					Dados.colunas = None

			for item in Dados.colunas:
				if 'Index' in item.capitalize():
					Dados.colunas.remove('Index')

			print('\nlinha:')
			for linha in Dados.importados:
				print(linha)

			return render(request, 'index.html', context = {'message': msg, 'msg_status': msg_cor, 'colunas': Dados.colunas})
	except:	# Clica em 'Enviar' sem carregar arquivo
		return render(request, 'index.html', context = {'message': 'Selecione um arquivo!!!', 'msg_status': 'vermelho'})

	else:	# requisição GET (só visita/leitura à pagina index.html)
		return render(request, 'index.html')

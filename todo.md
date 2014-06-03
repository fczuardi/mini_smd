#tarefas

## Planilha

- [ ] Listar os IDs com datas mal formatadas e criar uma coluna contendo flag de que necessita verificação
- [ ] Gerar planilha nova
- [x] Incluir coluna no spreadsheet com a idade dos participantes (mais velhos que 31 de desembro de 2013)
  - ```=YEAR(TODAY())-YEAR(K2)```
- [x] Incluir coluna com o resultado do criterio brasil
  - ```soma about_tv + about_radio + ... _instrucao_chefe``` - colunas O a X
  - esta soma divide em classes
    - A1,     A2,     B1,     B2,    C1,    C2,     D,      E (criterio brasil)
    - 42-46   35-41   29-34   23-28  18-22  14-17   8-13    0-7
    - A1+A2 = 1, B1+B2 = 2, C1+C2 = 3, D+E = 4
      - [x] Colunas novas = soma dos pontos, classe(1,2,3)
- [x] Remover colunas do m3 da planilha
- [x] Remover colunas coop/wonca da planilha
  - ```m3_a, b, c, d + m_result, m_status```
- [x] Novo criterio de positivo/negativo
  - ver source file

## App v2

- sai coop/wonca
- sai m3
- novo input de data para termos menos erros de formatação











-----
- colocar um indicativo de que um sujeito foi enviado

- colocar um ícone para quando salvar na homescreen
- implementar instalação via Mozilla App Store
- testar no browser nativo do android
- testar no chrome/android
- testar no android 2.3
- implementar tela de admin

+ opção para deletar um sujeito existente @done (2013-01-03 16:48)
+ mudar filename para cudit-1 @done (2013-01-03 15:23)
+ mudar filename de idate para audit3 @done (2013-01-03 15:33)
+ mudar nome de idate para audit @done (2013-01-03 15:05)
+ implementar export do Excel @done (2013-01-02 22:23)


# bugs
- carregamento dos iframes está rodando o load do javascript
+ apss3 esta com respostas ja preenchidas (mauricio disse que a ultima) @done (2012-12-27 17:49)


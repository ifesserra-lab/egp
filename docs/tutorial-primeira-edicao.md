# Primeira edição no site

Neste tutorial você vai alterar um texto do site do EGP e ver a alteração publicada. Ao final,
terá o site rodando na sua própria máquina e uma mudança sua no ar.

Tempo estimado: 40 minutos, sendo a maior parte na primeira instalação.

Você não precisa saber programar. Todos os comandos estão escritos aqui e o texto que vamos
alterar é uma frase comum, em português.

## O que você precisa antes de começar

- Um computador com Windows, macOS ou Linux.
- Acesso ao repositório <https://github.com/ifesserra-lab/egp> com permissão de escrita. Peça ao
  EGP se ainda não tiver.
- O programa **Git** instalado: <https://git-scm.com/downloads>.
- O programa **Node.js**, versão 22 ou superior: <https://nodejs.org> (baixe a opção "LTS").

Para conferir se os dois estão instalados, abra o terminal do seu computador e digite:

```bash
git --version
node --version
```

Você deve ver duas linhas com números de versão, como `git version 2.43.0` e `v22.11.0`. Se
alguma delas disser "command not found", instale o programa correspondente antes de continuar.

## Passo 1 — Trazer o site para a sua máquina

No terminal, digite:

```bash
git clone https://github.com/ifesserra-lab/egp.git
cd egp
```

Você verá o Git baixando os arquivos. Ao terminar, você está dentro da pasta do projeto.

## Passo 2 — Instalar o site

```bash
npm install
```

Este comando baixa as peças que o site usa para funcionar. Demora cerca de um minuto na primeira
vez. Ao terminar, aparece uma linha como `added 707 packages`.

## Passo 3 — Ver o site funcionando na sua máquina

```bash
npm run dev
```

O terminal vai mostrar um endereço, `http://localhost:4321`. Abra esse endereço no navegador.

Você deve ver a página inicial do EGP, com a missão e os quatro pilares de serviço. Este é o site
rodando no seu computador: ninguém além de você o enxerga.

Deixe este terminal aberto. Ele precisa continuar rodando enquanto você edita.

## Passo 4 — Alterar um texto

Vamos mudar a frase que aparece no cartão do primeiro pilar, na página inicial.

Abra o arquivo `src/content/pilares/padronizacao-e-metodologia.md` no editor de texto do seu
computador. Você vai ver um trecho assim, no começo do arquivo:

```markdown
resumo: Mentoria, templates e guias para submeter propostas com rigor metodológico.
```

Troque essa frase por:

```markdown
resumo: Mentoria e templates para submeter propostas com rigor metodológico e segurança.
```

Salve o arquivo.

Volte ao navegador. A página se atualiza sozinha e o cartão "Padronização e Metodologia" já mostra
a frase nova. Você acabou de editar o site.

## Passo 5 — Conferir que nada quebrou

Volte ao terminal e pare o servidor pressionando `Ctrl` + `C`. Depois digite:

```bash
npm run check
npm run build
```

O primeiro comando confere o conteúdo e o segundo monta o site para publicação. Você deve ver
`0 errors` no primeiro e `Complete!` no segundo.

Se aparecer uma mensagem de erro em vermelho citando o nome de um arquivo, é o site avisando que
algum campo ficou fora do formato. Volte ao arquivo que você editou e confira se apagou alguma
aspa ou dois-pontos por engano.

## Passo 6 — Registrar a sua alteração

```bash
git checkout -b minha-primeira-edicao
git add src/content/pilares/padronizacao-e-metodologia.md
git commit -m "Ajusta o resumo do pilar de padronização"
git push -u origin minha-primeira-edicao
```

O primeiro comando cria um espaço separado para o seu trabalho, para que o site publicado não
mude enquanto ninguém revisou. Os demais registram e enviam a alteração.

## Passo 7 — Publicar

Abra <https://github.com/ifesserra-lab/egp/pulls> no navegador. O GitHub mostrará um aviso sobre
a sua alteração recém-enviada, com um botão **Compare & pull request**. Clique nele, escreva uma
frase dizendo o que mudou e confirme em **Create pull request**.

Peça a um colega do EGP para revisar. Quando ele aprovar e clicar em **Merge pull request**, a
publicação acontece sozinha: em cerca de dois minutos, a alteração aparece em
<https://ifesserra-lab.github.io/egp/>.

## O que você aprendeu

Você trouxe o site para a sua máquina, viu o resultado antes de publicar, alterou um texto,
conferiu que nada quebrou e enviou a mudança para revisão. Esse é o caminho de toda alteração de
conteúdo, da menor à maior.

Da próxima vez, os passos 1 e 2 não são necessários: basta `git pull` para trazer as novidades e
`npm run dev` para começar.

## Para onde ir agora

- [Como editar o conteúdo](como-editar-conteudo.md) — as receitas para cada tipo de alteração.
- [Referência do conteúdo](referencia-conteudo.md) — todos os campos de cada arquivo.
- [Sobre as decisões do projeto](sobre-as-decisoes.md) — por que o conteúdo fica no repositório.

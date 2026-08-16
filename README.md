# Portfólio Intare Arquitetura

Site estático preparado para publicação no GitHub Pages.

## Estrutura

- `index.html`: página principal do portfólio.
- `assets/images/clientes/`: imagens organizadas em uma pasta por cliente.
- `projetos/`: páginas individuais dos clientes.
- `.nojekyll`: mantém a publicação do GitHub Pages simples e direta.

## Organização das imagens

Quando um novo cliente for incluído, crie uma subpasta com um nome curto, sem espaços e sem acentos:

```text
assets/images/clientes/nome-do-cliente/
```

Dentro dela, use nomes descritivos e sequenciais, por exemplo:

```text
capa.jpg
projeto-01.jpg
projeto-02.jpg
```

Os cards serão atualizados na página conforme os nomes dos clientes e suas imagens forem enviados.

### Projeto publicado

- Loja KFC: `projetos/kfc.html`
- Loja Kopenhagen: `projetos/kopenhagen.html`
- Sede Giramille: `projetos/giramille.html`
- Renderização e 3D: `projetos/renderizacao-e-3d.html`

## Publicação no GitHub Pages

Envie todo o conteúdo desta pasta para a raiz do repositório. No GitHub, abra **Settings > Pages**, escolha a publicação pela branch principal e selecione a pasta raiz.

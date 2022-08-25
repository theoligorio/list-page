const Categories = require('../models/categories')

exports.findAll = async (req, res) => {
    await Categories.findAll({
        atributes: ['id', 'name', 'description'],
        order: [['name', 'ASC']]
    })
    .then((Categories) => {
        return res.json({
            erro: false,
            Categories
    });
    }).catch((err) => {
        return res.status(404).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhuma Categoria encontrado!!!`
        })
    })
}
exports.findAllPages = async (req, res) => {
    console.log(req.params);

    const {page=1} = req.params;
    const limit = 2;
    let lastPage = 1;

    const countCategories = await Categories.count()
    console.log(countCategories)

    if(countCategories === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Error: Categorias não encontrada!!!"
        })
    } else {
        lastPage = Math.ceil(countCategories / limit);
        console.log(lastPage);
    }
    // Select id, name, description from Categories Limit 2 offset 3
    // Exemplo:
    // pag 1 = 1,2
    // pag 2 = 3,4
    // pag 3 = 5,6

    await Categories.findAll({
        atributes: ['id', 'name', 'description'],
        order: [['id', 'ASC']],
        offset: Number ((page * limit) - limit ), // pag 3 * 2 = 6 
        limit: limit
    })
    .then((Categories) => {
        return res.json({
            erro: false,
            Categories,
            countCategories,
            lastPage
    });
    }).catch((err) => {
        return res.status(404).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhuma Categoria encontrado!!!`
        })
    })
}

exports.findOne = async (req, res) => {
    const { id } = req.params;
    try{
        const Categorie = await Categories.findByPk(id);
        if(!Categorie){
            return res.status(400).json({
                erro: true,
                mensagem: 'Erro Categoria não encontrada!'
            })
        }
        res.status(200).json({
            erro: false,
            Categorie
        })
    }catch(err) {
        res.status(404).json({
            erro: true,
            mensagem: `Erro: ${err}`
        })
    }
}

exports.create = async (req, res) => {
    var dados = req.body;
    await Categories.create(dados)
    .then(() =>{

        return res.json({
            erro: false,
            mensgem: 'Categoria cadastrada com sucesso!'
        });
    }).catch(err => {
        return res.status(400).json({
            erro: true,
            mensgem: `Erro: Categoria não cadastrada...${err}`
        })
    })
}

exports.update = async (req, res) => {
    const { id } = req.body;
    await Categories.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Categoria alterada com sucesso!'
        })
    }).catch((err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Categoria não alterada ...${err}`
        })
    })
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    await Categories.destroy({where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Categoria apagada com sucesso!!!'
        })
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} Categoria não apagada...`
        })
    })
}
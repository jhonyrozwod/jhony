const express = require('express');

const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/user.controller');
const { verifyCode } = require('../middlewares/verifyCode');


const mongoose = require("mongoose");
const { listarPostagens } = require('../middlewares/getPostagens');
require("../models/categorias")
const Categoria = mongoose.model("categorias")
require("../models/postagens")
const Postagem = mongoose.model("postagens")

// ==> Rota responsável por Criar um novo 'User': (POST): localhost:3000/api/v1/register
router.post('/register', userController.registerNewUser);

// ==> Rota responsável por realizar um novo login 'User': (POST): localhost:3000/api/v1/login
router.post('/login', userController.loginUser);

// ==> Rota responsável por retornar o perfil/profile do 'User': (GET): localhost:3000/api/v1/userProfile
router.get('/userProfile', auth, userController.returnUserProfile);

//Verificar codigo   
router.post('/verifyCode', verifyCode );


router.get("/postagens", listarPostagens );




router.get('/posts',  (req, res) => {
    res.send("pagina de posts")
})

router.get("/categorias", (req, res) => {
    Categoria.find().sort({ date: "desc" }).lean().then((categorias) => {
        res.render("admin/categorias", { categorias: categorias })
    }).catch((err) => {
        req.flash("error_msg", "erororrooororooorroror")
        res.redirect("/admin")
    })
})

router.get("/categorias/add",(req, res) => {
    res.render("admin/addcategoria")
})

router.post("/categorias/nova", (req, res) => {

    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome invalido" })
    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: "slug invalido" })

    }

    if (req.body.nome.length < 2) {
        erros.push({ texto: "nome pekeno" })
    }

    if (erros.length > 0) {
        res.render("admin/addcategoria", {
            erros: erros
        })
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "categoria criada")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "EROOOOO BURROOOO")
            console.log("erroo")

        })
    }
})
router.get("/categorias/edit/:id",  (req, res) => {
    Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
        res.render("admin/editcategorias", { categoria: categoria })
    }).catch((err) => {
        req.flash("error_msg", "esta categoria nao existe")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/edit",  (req, res) => {

    Categoria.findOne({ _id: req.body.id }).then((categoria) => {

        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        Categoria(categoria).save().then(() => {
            req.flash("success_msg", "Categoria editadadaadjasda")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "ERROROROROOROROROR")
            res.redirect("/admin/categorias")
        })


    }).catch((err) => {
        req.flash("error_msg", "eorororororororo")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/deletar", (req, res) => {
    Categoria.findOneAndRemove({ _id: req.body.id }).then(() => {
        req.flash("success_msg", "Categoria deletada")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "houve um erro ao deletar")
        res.redirect("/admin/categorias")
    })
})



router.get("/postagens/add",  (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render("admin/addpostagens", { categorias: categorias })
    }).catch((err) => {
        req.flash("error_msg", "houve um erro carregar o formulario")
        res.redirect("/admin/")
    })
})
router.post("/postagens/nova",  (req, res) => {
    var erros = []

    if (req.body.categoria == "0") {
        erros.push({ texto: "Categoria invalida, registre uma" })
    }
    if (erros.length > 0) {
        res.render("admin/addpostagens", { erros: erros })
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "erro ao criar postagem")
            res.redirect("/admin/postagens")
        })

    }

})


router.get("/postagens/edit/:id", (req, res) => {

    Postagem.findOne({ _id: req.params.id }).lean().then((postagens) => {

        Categoria.find().lean().then((categorias) => {
            res.render("admin/editpostagens", { categorias: categorias, postagens: postagens })
        }).catch((err) => {
            req.flash("error_msg", "houveumerooo")
            res.redirect("/admin/postagens")
        })
    }).catch((err) => {
        req.flash("error_msg", "houve erro 2 catch")
        res.redirect("/admin/postagens")
    })

})

router.post("/postagens/edit",  (req, res) => {
    Postagem.findOne({ _id: req.body.id }).then((postagem) => {
        postagem.titulo = req.body.titulo
        postagem.slug = req.body.descricao
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.categoria = req.body.categoria

        Postagem(postagem).save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso")
            res.redirect("/admin/postagens")

        }).catch((err) => {
            req.flash("error_msg", "erro ao salvar")
            res.redirect("/admin/postagens")
        })

    })

})

router.get("/postagens/deletar/:id",  (req, res) => {
    Postagem.findOneAndRemove({ _id: req.params.id }).then(() => {
        req.flash("success_msg", "Postagem deletada")
        res.redirect("/admin/postagens")
    }).catch((err) => {
        req.flash("error_msg", err)
        res.redirect("/admin/postagens")
    })
})

module.exports = router;
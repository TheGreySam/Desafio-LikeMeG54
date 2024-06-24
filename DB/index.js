//import { findAllPosts } from "./connection.js";
import express from 'express';
import { connection } from "./connection.js";
//const express = require('express');

const app = express();

app.get("/posts", async (req, res) => {
    try {
        const todos = await connection.findAllPosts();
        return res.json(todos);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error" });
    }
});

app.get("posts/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const post = await connection.findById(id);
        if (!post) {
            res.status(404).json({ message: "Post no encontrado"});
        }
        res.json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/posts", async (req, res) => {
    const {titulo} = req.body;

    if(!titulo) {
        return res.status(400).json({ message: "Titulo requerido"})
    }
    const newPost = {
        titulo
    };
    try {
        const post = await connection.create(newPost);
        return res.json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.delete("/posts/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const post = await connection.delete(id);
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado"});
        }
        return res.json({ message: "Post eliminado"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.put("/posts/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const post = await connection.update(id);
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" });
        }
        return res.json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error"});
    }
});
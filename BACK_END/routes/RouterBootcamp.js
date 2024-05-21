const express = require("express");
const BootcampModel = require("../models/BootcampModel");
const mongoose = require("mongoose");
const router = express.Router();

//URIS DEL BOOTCAMP

//consulta general

router.get("/", async (req, res) => {
  //find:es para traer arreglos de entidades
  //son promesas
  //trae todos lo bootcamps
  try {
    const bootcamps = await BootcampModel.find();
    //if de error
    if (bootcamps.length === 0) {
      //codig de status 400 error en el  back end
      res.status(400).json({
        success: false,
        msg: "No hay bootcamps",
      });
    } else {
      res.status(200).json({
        success: true,
        data: bootcamps,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error interno de servidor${error.message}`,
    });
  }
});

//consulta especifica

router.get("/:id", async (req, res) => {
  //Traer bootcamp por id
  try {
    //if de error que no existe ese id
    // validar si el id es valido para mongoose
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `id invalido`,
      });
    } else {
      const bootcamp = await BootcampModel.findById(req.params.id);
      if (!bootcamp) {
        //el bootcamp no existe
        res.status(400).json({
          success: false,
          msg: `No existe el bootcamp ${req.params.id}`,
        });
      } else {
        //el bootcamp existe
        res.status(200).json({
          success: true,
          data: bootcamp,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error interno de servidor${error.message}`,
    });
  }
});

//ingreso o creacion de bootcamps
router.post("/", async (req, res) => {
  //registrar nuevo bootcamp

  try {
    const NewBootcamp = await BootcampModel.create(req.body);
    res.status(201).json({
      success: true,
      data: NewBootcamp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `${error.message}`,
    });
  }
});

//se creara a metodo PUT para cambiar o editar los atributos
router.put("/:id", async function (req, res) {
  try {
    //if de error que no existe ese id
    // validar si el id es valido para mongoose
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `id invalido`,
      });
    } else {
      const bootcampU = await BootcampModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!bootcampU) {
        //no existe el bootcamp
        res.status(400).json({
          success: false,
          msg: `No existe el bootcamp ${req.params.id}`,
        });
      } else {
        //si existe el bootcamp
        res.status(200).json({
          success: true,
          data: bootcampU,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error interno de servidor${error.message}`,
    });
  }
});

// se eliminara con metodo delete

router.delete("/:id", async (req, res) => {
  //eliminar bootcamp

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        msg: `id invalido`,
      });
    } else {
      const DeleteBootcamp = await BootcampModel.deleteOne(
        BootcampModel.findById(req.params.id)
      );
      res.json({
        success: true,
        data: DeleteBootcamp,
        msg: `Se elimino el bootcamp: ${req.params.id}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error interno de servidor${error.message}`,
    });
  }
});

module.exports = router;
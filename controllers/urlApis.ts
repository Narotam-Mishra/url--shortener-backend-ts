
import express from "express";
import { shortUrlModel } from "../model/urlModel";

export const createUrl = async (req: express.Request, res: express.Response) => {
    try {
        console.log("The fullUrl is:", req.body.fullUrl);
        const { fullUrl } = req.body;
        const urlFound = await shortUrlModel.find({ fullUrl })
        if(urlFound.length > 0){
            res.status(409); // for conflicts
            res.send(urlFound);
        }else{
            const shortUrl = await shortUrlModel.create({ fullUrl });
            res.status(201).send(shortUrl);
        }
    } catch (error) {
        res.status(500).send({
            message: "Something went wrong"
        });
    }
}

export const getAllUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrls = await shortUrlModel.find();
        if(shortUrls.length < 0){
            res.status(404).send({
                message: "Short Url not found!" 
            });
        }else{
            res.status(200).send(shortUrls);
        }
    } catch (error) {
        res.status(500).send({
            message: "Something went wrong"
        });
    }
}

export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await shortUrlModel.findOne({ shortUrl: req.params.id });
    if (!shortUrl) {
      res.status(404).send({
        message: "Full Url not found!"
      });
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      res.redirect(`${shortUrl.fullUrl}`);
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrl = await shortUrlModel.findByIdAndDelete({ _id: req.params.id });
    if (shortUrl) {
      res.status(200).send({
        message: "Requested URL successfully deleted!!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
};


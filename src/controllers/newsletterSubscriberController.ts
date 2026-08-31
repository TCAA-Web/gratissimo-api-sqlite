import { prisma } from "../index";
import { Request, Response } from "express";
import { parseId } from "../utils/parseId";
import { AppError } from "../utils/AppError";

export class NewsletterSubscriberController {
  getAllNewsletterSubscribers = async (req: Request, res: Response) => {
    const items = await prisma.newsletterSubscriber.findMany();
    res.status(200).json(items);
  };

  getNewsletterSubscriberById = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) throw new AppError(400, "Invalid newsletter subscriber ID");

    const item = await prisma.newsletterSubscriber.findUnique({
      where: { id },
    });
    if (!item) throw new AppError(404, "Newsletter subscriber not found");
    res.status(200).json(item);
  };

  createNewsletterSubscriber = async (req: Request, res: Response) => {
    const data = { ...req.body };
    const item = await prisma.newsletterSubscriber.create({ data });
    res.status(201).json(item);
  };

  updateNewsletterSubscriber = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) throw new AppError(400, "Invalid newsletter subscriber ID");

    const existingItem = await prisma.newsletterSubscriber.findUnique({
      where: { id },
    });
    if (!existingItem)
      throw new AppError(404, "Newsletter subscriber not found");

    const data = { ...req.body };
    const item = await prisma.newsletterSubscriber.update({
      where: { id },
      data,
    });
    res.status(200).json(item);
  };

  deleteNewsletterSubscriber = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) throw new AppError(400, "Invalid newsletter subscriber ID");

    const existingItem = await prisma.newsletterSubscriber.findUnique({
      where: { id },
    });
    if (!existingItem)
      throw new AppError(404, "Newsletter subscriber not found");

    await prisma.newsletterSubscriber.delete({ where: { id } });
    res.status(200).send("Newsletter deleted");
  };
}

export const newsletterSubscriberController =
  new NewsletterSubscriberController();

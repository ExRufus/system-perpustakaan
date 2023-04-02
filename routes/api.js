const express = require("express");
const router = require("./router");
const { Book, Member, LoanBook } = require("./../models")
const api = express.Router();

// Section Books
api.get("/v1/books", async (req, res) => {
  const books = await Book.findAll();
  try {
    res
    .status(200)
    .json({ status: "success", data: books })
  } catch (err) {
    res
    .status(400)
    .json({
      status: "failed",
      message: err.message,
      stack: err
    })
  }
})

api.post('/v1/books', async (req, res) => {
  const { title, author, publish_year, description } = req.body;
  try {
      const book = await Book.create({
          title, author, publish_year, description
      });

      res.status(201).json({
          status: "success",
          data: book,
          message: "Data buku berhasil ditambahkan!"
      });
  } catch (err) {
      res.status(400).json({
          status: "failed",
          data: req.body,
          message: err.message,
          stack: err
      })
  }
});

api.get("/v1/members", async (req, res) => {
  const members = await Member.findAll();
  try {
    res.status(200).json({status: "success", data: members});
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      stack: error
    })
  }
});

api.post("/v1/members", async (req, res) => {
  const { name, npa, email, phone } = req.body;
  try {
    const member = await Member.create({
      name, npa, email, phone
    });

    res.status(200).json({
      status: "success",
      data: member,
      message: "Data member berhasil ditambahkan"
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: req.body,
      message: err.message,
      stack: err
    })
  }
});

api.get("/v1/loans", async (req, res) => {
  const loans = await LoanBook.findAll({
    include: [
      {
        model: Book
      },
      {
        model: Member
      }
    ]
  });

  res.status(200).json({
    status: "success", data: loans
  });
});

api.post("/v1/loans", async (req, res) => {
  const { member_id, book_id, length_of_loan } = req.body;

  const date = new Date();
  const due_date_of_loan = date.setDate(date.getDate() + length_of_loan);
  
  try {
    const loan = await LoanBook.create({
      member_id, book_id, length_of_loan, due_date_of_loan
    });

    res.status(201).json({
      status: "success",
      data: loan,
      message: "Data pinjaman berhasil ditambahkan!"
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: req.body,
      message: error.message,
      stack: error
    })
  }
});

api.get("/v1/members/loan/:id", async (req, res) => {
  const member = await Member.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: LoanBook,
        include: [{
          model: Book
        }]
      }
    ]
  })

  res.status(201).json({status: "success", data: member })
});

module.exports = api
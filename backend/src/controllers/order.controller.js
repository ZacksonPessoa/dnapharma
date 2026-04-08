const prisma = require("../lib/prisma");

exports.createOrder = async (req, res) => {
  try {
    const { name, phone, email, quantity } = req.body;

    if (!name || !phone || !email || quantity === undefined || quantity === null) {
      return res.status(400).json({
        ok: false,
        message: "name, phone, email e quantity são obrigatórios",
      });
    }

    const parsedQuantity = Number(quantity);
    const unitPrice = 97.0;
    const totalAmount = unitPrice * parsedQuantity;

    let customer = await prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name,
          phone,
          email,
        },
      });
    }

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        quantity: parsedQuantity,
        unitPrice,
        totalAmount,
        status: "NEW",
      },
    });

    return res.status(201).json({
      ok: true,
      message: "Pedido salvo com sucesso",
      order,
    });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);

    return res.status(500).json({
      ok: false,
      message: error.message || "Erro interno ao criar pedido",
    });
  }
};

exports.listOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      ok: true,
      orders,
    });
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);

    return res.status(500).json({
      ok: false,
      message: error.message || "Erro interno ao listar pedidos",
    });
  }
};
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        ok: false,
        message: "status é obrigatório",
      });
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    return res.json({
      ok: true,
      message: "Status atualizado com sucesso",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Erro ao atualizar status do pedido:", error);

    return res.status(500).json({
      ok: false,
      message: error.message || "Erro interno ao atualizar status",
    });
  }
};
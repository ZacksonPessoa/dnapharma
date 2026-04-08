exports.adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          ok: false,
          message: "email e password são obrigatórios",
        });
      }
  
      if (
        email !== process.env.ADMIN_EMAIL ||
        password !== process.env.ADMIN_PASSWORD
      ) {
        return res.status(401).json({
          ok: false,
          message: "Credenciais inválidas",
        });
      }
  
      return res.json({
        ok: true,
        message: "Login realizado com sucesso",
        admin: {
          email,
        },
        token: "admin-session-token",
      });
    } catch (error) {
      console.error("Erro no login admin:", error);
  
      return res.status(500).json({
        ok: false,
        message: error.message || "Erro interno no login admin",
      });
    }
  };
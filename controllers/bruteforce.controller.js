let a = "";

export const guess = async (req, res) => {

    let code = req.body?.code;

    if (!code) {
        return res.status(400).json({message:'Code is required'});
    }

    code = code.join("");

    console.log(code, a, code === a)

    if (code === a) {
        return res.json({message:'You guessed the code'});
    }

    res.status(400).json({message:'Wrong code'});
}

export const create = async (req, res) => {
    const code = req.body?.code;
    console.log(req.body);

    if (!code) {
        return res.status(400).json({message:'Code is required'});
    }

    a = code.join("");
    console.log(a);

    res.json({message:'Code created'});
}
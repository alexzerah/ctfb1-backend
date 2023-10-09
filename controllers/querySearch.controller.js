let a = "";

export const get = async (req, res) => {

    let role = req.body?.role;

    if (role === "admin") {
        return res.status(200).json({message:'Code is YODA'});
    }

    res.status(400).json({message:`Vous n'avez pas les droits`});
}
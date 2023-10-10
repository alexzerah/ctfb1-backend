let a = "";

export const get = async (req, res) => {

    let role = req.body?.role;

    if (role === "admin") {
        return res.status(200).json({message:'Code is YODA1234'});
    }

    res.status(400).json({message:`Vous n'avez pas les droits, vérifier le body de la requête`});
}

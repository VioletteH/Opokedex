import { ValidationError } from 'sequelize';

export default (middleware) => {
    return async (req, res, next) => {
        try{
            console.log(`[Wrapper] Début pour route: ${req.method} ${req.originalUrl}`);
            await middleware(req, res, next);
            console.log(`[Wrapper] Middleware terminé pour route: ${req.method} ${req.originalUrl}. headersSent: ${res.headersSent}`);

        }catch(error){
            console.error(error); 

            if (error instanceof ValidationError) {
                console.error(`[Wrapper] Erreur capturée pour route: ${req.method} ${req.originalUrl}`, error);

                const errors = error.errors.map(err => ({
                    field: err.path,    // Le champ qui a causé l'erreur
                    message: err.message, // Le message d'erreur de validation
                    value: err.value    // La valeur qui a échoué la validation (peut être null ou undefined)
                }));
                console.log(`[Wrapper] Erreur de validation Sequelize, renvoi 400.`);

                return res.status(400).json({ message: "Validation error: The provided data is invalid.", details: errors });
            } else {
                console.log(`[Wrapper] Autre erreur, renvoi 500.`);

                return res.status(500).json({ "error": "Unexpected server error. Please try again later."});
            }
        }  
    }
    console.log(`[Wrapper] Fin pour route: ${req.method} ${req.originalUrl}.`);

}
  
  
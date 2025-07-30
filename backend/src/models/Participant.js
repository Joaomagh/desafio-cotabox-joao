const mongoose = require('mongoose'); 
const ParticipantSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, 'O primeiro nome é obrigatório.'] 
    },
    lastName: {
        type: String,
        required: [true, 'O sobrenome é obrigatório.'] 
    },
    participation: {
        type: Number, 
        required: [true, 'A participação é obrigatória.'],
        min: [0, 'A participação não pode ser negativa.'], 
        max: [100, 'A participação não pode exceder 100.'] 
    },
}, {
    timestamps: true 
});

module.exports = mongoose.model('Participant', ParticipantSchema);

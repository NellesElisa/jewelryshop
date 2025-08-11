import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = ({ formId, contactTarget }) => {
  const [state, handleSubmit] = useForm(formId);
  
  if (state.succeeded) {
    return <p>Merci ! Votre message a bien été envoyé.</p>;
  }

  const formTitle ='Demandez votre devis';

  const formSubject = 'Envoyer ma demande';

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h3>{formTitle}</h3>
      <input type="hidden" name="_subject" value={formSubject} />
      
      <label htmlFor="nom">Votre Nom</label>
      <input 
        id="nom" 
        type="text" 
        name="nom" 
        required 
        autoComplete="name"
      />
      <ValidationError field="nom" errors={state.errors} />

      <label htmlFor="email">Votre Email</label>
      <input 
        id="email" 
        type="email" 
        name="email" 
        required 
        autoComplete="email"
      />
      <ValidationError field="email" errors={state.errors} />

      <label htmlFor="message">Votre message</label>
      <textarea 
        id="message" 
        name="message" 
        required 
        rows="5"
      />
      <ValidationError field="message" errors={state.errors} />

      <button type="submit" disabled={state.submitting}>
        Envoyer
      </button>
    </form>
  );
};

export default ContactForm;

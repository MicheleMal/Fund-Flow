# Earning Expense Manager

Questo progetto consente agli utenti di registrare e gestire le proprie entrate e uscite in modo indipendente.

## Funzionalità
* **Inserimento della fonte delle entrate:** indicando il nome della fonte e il tipo (fisso o variabile), con il default su variabile.

* **Modifca della fonte delle entrate:** permettendo agli utenti di modificare la fonte delle entrate.

* **Eliminazione della fonte delle entrate inserite:** eliminazione della fonte dell'entrata inserita.

* **Inserimento delle entrate:** inserendo descrizione, saldo, data e fonte dell'entrata. Ogni inserimento incrementa un valore che gestisce il totale delle entrate per anno e mese.

* **Eliminazione dell'entrata inserita:** eliminando un'entrata, il saldo totale viene automaticamente decrementato.

* **Modifca delle entrate inserite:** permettendo agli utenti di modificare le entrate già registrate, incluso il saldo. La modifica del saldo aggiornerebbe automaticamente il totale delle entrate.

* **Inserimento della fonte delle uscita:** indicando il nome della fonte e il tipo (fisso o variabile), con il default su variabile.

* **Eliminazione della fonte dell'uscita inserita:** eliminazione della fonte dell'uscita inserita.

* **Modifca della fonte delle uscite:** permettendo agli utenti di modificare la fonte delle uscite.

* **Inserimento delle uscita:** inserendo descrizione, saldo, data e fonte dell'uscita.

* **Modifca delle entrate inserite:** permettendo agli utenti di modificare le uscite già registrate, incluso il saldo. La modifica del saldo aggiornerebbe automaticamente il totale delle entrate.

* **Eliminazione delle uscite inserite:** eliminando un'uscita, il saldo totale viene automaticamente decrementato.

## Tecnologie usate
* **Backend:** Nestjs
* **Database:** MongoDB

## Prossime funzionalità
* Migliorare l'autenticazione degli utenti, includendo invio email
* Sviluppare sistema reset password
* Inserire funzionalità account verificato 

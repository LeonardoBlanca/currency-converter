import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");

  // Armazenar o resultado em um estado.
  const [converted, setConverted] = useState('');

  // Define o estado de carregamento
  const [isLoading, setIsLoading] = useState(false);


  useEffect(function(){
    async function convert(){
      setIsLoading(true)
      const result = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`)
      const data = await result.json();
      // O rates vem da API. 
      // Vamos imprimir o resultado e a moeda selecionada
      setConverted(data.rates[toCur])
      setIsLoading(false);
    } 

    if(fromCur === toCur) return setConverted(amount);
    
    convert();
  }, [amount, fromCur, toCur])

  return (
    <div>
      <h1>Currency Converter</h1>
      
      <input type="text" value={amount} onChange={(e) => setAmount(Number(e.target.value))} disabled={isLoading} />
      <select value={fromCur} onChange={(e) => setFromCur(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="BRL">BRL</option>
      </select>
      <select value={toCur} onChange={(e) => setToCur(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="BRL">BRL</option>
      </select>
      <p>{converted} {toCur}</p>
    </div>
  );
}

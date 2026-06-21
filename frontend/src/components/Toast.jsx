import { createContext, useContext, useState, useCallback } from 'react';

// Avisos rápidos (sucesso/erro) no canto da tela, sem usar alert().
const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remover = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const mostrar = useCallback(
    (texto, tipo) => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, texto, tipo }]);
      setTimeout(() => remover(id), 3500);
    },
    [remover]
  );

  const valor = {
    sucesso: (texto) => mostrar(texto, 'sucesso'),
    erro: (texto) => mostrar(texto, 'erro'),
  };

  return (
    <ToastContext.Provider value={valor}>
      {children}
      <div className="cb-toast-area">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`cb-toast ${t.tipo}`}
            onClick={() => remover(t.id)}
          >
            {t.texto}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

import React, { useState, useEffect } from "react";

function TodoList() {
  // Inicializa el estado leyendo directamente de localStorage
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");

  // Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Estadísticas
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;

  // Barra de progreso: porcentaje de tareas completadas
  let progress = 0;
  if (total > 0) {
    progress = Math.round((completed / total) * 100);
  }

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0d1fff",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingTop: "28px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Esferas de fondo */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "15%",
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 30% 30%, #6366f1, #3b82f6, #1e40af)",
        filter: "blur(40px)",
        opacity: 0.3,
        animation: "float1 8s ease-in-out infinite"
      }} />
      
      <div style={{
        position: "absolute",
        top: "60%",
        right: "10%",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, #8b5cf6, #7c3aed, #6d28d9)",
        filter: "blur(60px)",
        opacity: 0.25,
        animation: "float2 10s ease-in-out infinite"
      }} />
      
      <div style={{
        position: "absolute",
        top: "20%",
        right: "20%",
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #06b6d4, #0891b2, #0e7490)",
        filter: "blur(30px)",
        opacity: 0.4,
        animation: "float3 6s ease-in-out infinite"
      }} />
      
      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "8%",
        width: "160px",
        height: "160px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 30% 30%, #f59e0b, #d97706, #b45309)",
        filter: "blur(50px)",
        opacity: 0.2,
        animation: "float4 12s ease-in-out infinite"
      }} />
      
      <div style={{
        position: "absolute",
        top: "40%",
        left: "5%",
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, #ec4899, #db2777, #be185d)",
        filter: "blur(35px)",
        opacity: 0.3,
        animation: "float5 9s ease-in-out infinite"
      }} />
      
      <div style={{
        position: "absolute",
        bottom: "30%",
        right: "25%",
        width: "90px",
        height: "90px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 30% 30%, #10b981, #059669, #047857)",
        filter: "blur(40px)",
        opacity: 0.35,
        animation: "float6 7s ease-in-out infinite"
      }} />

      <div style={{
        width: 420,
        background: "linear-gradient(135deg, #0a0814 0%, #0d1117 50%, #111827 100%)",
        borderRadius: 20,
        border: "2px solid #f1f1f1ff",
        boxShadow: "0 10px 24px rgba(125, 110, 253, 0.94)",
        overflow: "hidden",
        position: "relative",
        zIndex: 10,
        backdropFilter: "blur(10px)"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #0f0d1f 0%, #1a1b3a 50%, #2d2e5f 100%)",
          padding: "24px 0 12px 0",
          textAlign: "center",
          color: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20
        }}>
          <h2 style={{ margin: 0, fontWeight: "bold", fontSize: "2rem" }}>Mi To-Do List</h2>
          <div style={{ fontSize: 16, marginTop: 4 }}>
            {total === 0
              ? "No hay tareas aún"
              : `${completed}/${total} completadas`}
          </div>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", marginBottom: 20 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe una nueva tarea..."
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: 16,
                outline: "none",
                background: "#f8fafc",
                color: "#000"
              }}
              onKeyDown={e => e.key === "Enter" && addTodo()}
            />
            <button
              onClick={addTodo}
              style={{
                marginLeft: 8,
                background: "linear-gradient(135deg, #0f0d1f 0%, #2d1b69 50%, #6366f1 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0 18px",
                fontSize: 24,
                cursor: "pointer",
                fontWeight: "bold",
                height: "48px"
              }}
              title="Agregar tarea"
            >
              +
            </button>
          </div>
          <div
            style={{
              maxHeight: "220px",
              overflowY: "auto",
              marginBottom: "10px",
              paddingRight: "4px"
            }}
            className="custom-scrollbar"
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {todos.map((todo, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px",
                    borderBottom: "1px solid #f1f5f9",
                    borderRadius: 12,
                    marginBottom: 10,
                    background: todo.completed ? "#ecfdf5" : "#fff",
                    position: "relative",
                    zIndex: 1
                  }}
                >
                  <button
                    onClick={() => toggleTodo(idx)}
                    style={{
                      background: todo.completed ? "#1e1475ff" : "#ffffffff",
                      color: todo.completed ? "#ffffffff" : "#0026a1ff",
                      border: "2px solid #060246ff",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      marginRight: 12,
                      fontSize: 18,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    title="Completar"
                  >
                    {todo.completed ? "✔" : ""}
                  </button>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 16,
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: "#000",
                      cursor: "pointer"
                    }}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(idx)}
                    style={{
                      background: "none",
                      color: "#ef4444",
                      border: "none",
                      borderRadius: 6,
                      padding: "2px 10px",
                      fontSize: 20,
                      marginLeft: 8,
                      cursor: "pointer"
                    }}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Barra de estadísticas */}
          <div style={{ marginTop: 24 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              fontSize: 16,
              color: "#ffffffff"
            }}>
              <span>Total: {total}</span>
              <span>Pendientes: {pending}</span>
              <span>Completadas: {completed}</span>
            </div>
            <div style={{
              width: "100%",
              height: 8,
              border: "1px solid #ffffffff",
              boxShadow: "0 2px 4px rgba(99, 102, 241, 0.6)",
              background: "linear-gradient(135deg, #0f0d1f 0%, #374151 100%)",
              borderRadius: 8,
              overflow: "hidden"
            }}>
              <div style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)",
                transition: "width 0.5s"
              }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Estilos para el scrollbar personalizado y animaciones */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(90deg, #6366f1 0%, #3b82f6 100%);
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #e0e7ff;
            border-radius: 8px;
          }
          input::placeholder {
            color: #000 !important;
            opacity: 1;
          }
          
          @keyframes float1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, -30px) scale(1.1); }
          }
          
          @keyframes float2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-30px, 20px) scale(0.9); }
          }
          
          @keyframes float3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(15px, 25px) scale(1.2); }
          }
          
          @keyframes float4 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(25px, -15px) scale(0.8); }
          }
          
          @keyframes float5 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, -25px) scale(1.1); }
          }
          
          @keyframes float6 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, 10px) scale(0.9); }
          }
        `}
      </style>
    </div>
  );
}

export default TodoList;
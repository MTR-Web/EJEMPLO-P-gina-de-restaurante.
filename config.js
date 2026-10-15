/*
  CONFIGURACIÓN DE LA PLANTILLA
  Personalizá este archivo para cada restaurante. Usá el WhatsApp con código de país,
  sin +, espacios ni guiones. Ejemplo de Argentina: 5491112345678.
*/
const CONFIG = {
  nombre: "Mesa Moderna",
  rubro: "Restaurante de cocina variada",
  whatsapp: "5491112345678", // REEMPLAZAR por el WhatsApp real
  telefonoVisible: "+54 9 11 1234-5678", // REEMPLAZAR
  direccion: "Av. Ejemplo 1234, Buenos Aires", // REEMPLAZAR
  mapsUrl: "https://maps.google.com/?q=Av.+Ejemplo+1234+Buenos+Aires", // REEMPLAZAR
  horarios: "Lunes a domingo · 12:00–15:00 y 20:00–23:30", // REEMPLAZAR
  avisoSuperior: "Cocina de estación · Ingredientes frescos todos los días",
  portada: {
    descripcion: "Sabores honestos, productos frescos y platos pensados para compartir. Tu próximo lugar favorito está acá.",
    nota: "Abierto para almuerzo y cena",
    imagen: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85"
  },
  nosotros: {
    titulo: "La buena cocina empieza con lo simple.",
    descripcion: "Creemos en los ingredientes de calidad, las recetas que se disfrutan y la atención que te hace sentir en casa. Cocinamos para que cada encuentro tenga algo especial.",
    firma: "Te esperamos en la mesa",
    imagen: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85"
  },
  colores: {
    fondo: "#ffffff",
    texto: "#20231f",
    acento: "#c36c45",
    tarjeta: "#ffffff",
    oscuro: "#242923"
  },
  platos: [
    { nombre: "Burrata de estación", categoria: "Entradas", descripcion: "Burrata cremosa, tomates de estación, albahaca y aceite de oliva.", precio: "$8.500", etiqueta: "Para compartir", imagen: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=80" },
    { nombre: "Pasta del día", categoria: "Principales", descripcion: "Pasta fresca con salsa de cocción lenta y hierbas aromáticas.", precio: "$12.900", etiqueta: "Favorito", imagen: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80" },
    { nombre: "Pollo al horno", categoria: "Principales", descripcion: "Pollo dorado, vegetales asados y jugo de hierbas.", precio: "$14.500", etiqueta: "De la casa", imagen: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80" },
    { nombre: "Risotto cremoso", categoria: "Principales", descripcion: "Arroz cremoso, hongos salteados, parmesano y perejil fresco.", precio: "$13.800", etiqueta: "Vegetariano", imagen: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80" },
    { nombre: "Cheesecake de la casa", categoria: "Postres", descripcion: "Textura suave, frutos rojos y una base crocante.", precio: "$6.200", etiqueta: "Dulce final", imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80" },
    { nombre: "Limonada fresca", categoria: "Bebidas", descripcion: "Limón exprimido, menta fresca y un toque de jengibre.", precio: "$3.500", etiqueta: "Sin alcohol", imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=900&q=80" }
  ],
  galeria: [
    { imagen: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85", alt: "Mesa preparada para una cena", texto: "Una mesa para compartir" },
    { imagen: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85", alt: "Plato fresco con vegetales", texto: "Ingredientes de estación" },
    { imagen: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=85", alt: "Ambiente cálido de restaurante", texto: "Un ambiente para disfrutar" },
    { imagen: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1000&q=85", alt: "Plato servido con cuidado", texto: "Cada detalle importa" }
  ]
};

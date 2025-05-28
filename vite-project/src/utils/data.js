export const adminMenu = [
    {
        title: "Reibidos",
        ruta: "/recibidos",
    },
    {
        title: "Categorias",
        children: [
            {
                title: "Camisetas",
                ruta: "/camisetas"
            },
            {
                title: "Pantalones",
                ruta: "/pantalones"
            },
            {
                title: "Zapatos",
                ruta: "/zapatos"
            }
        ]
    },
    {
        title: "A Corregir",
        ruta: "/a-corregir"
    },
    {
        title: "Completados",
        ruta: "/completados"
    }
]

export const userMenu = [
    {
        title: "Dashboard",
        ruta: "/dashboard"
    },
    {
        title: "Mis Pedidos",
        children: [
            {
                title: "Pendientes",
                ruta: "/mis-pedidos-pendientes"
            },
            {
                title: "Despachados",
                ruta: "/mis-pedidos-despachados"
            }
        ]
    }
]

export const rutas = {
    "/recibidos": "Recibidos",
    "/camisetas": "Camisetas",
    "/pantalones": "Pantalones",
    "/zapatos": "Zapatos",
    "/a-corregir": "A Corregir",
    "/completados": "Completados",
    "/dashboard": "Dashboard",
    "/mis-pedidos-pendientes": "Mis Pedidos Pendientes",
    "/mis-pedidos-despachados": "Mis Pedidos Despachados"
}
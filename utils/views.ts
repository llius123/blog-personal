export interface ViewsInterface {
    id: string,
    href: string;
    title: string;
}

export const Views: ViewsInterface[] = [
    {
        id: '1',
        href: '/profile',
        title: 'Perfil'
    },
    {
        id: '2',
        href: '/biblioteca',
        title: 'Biblioteca'
    }
]

// export const Views: ViewsInterface[] = [
//     {
//         id: '1',
//         href: '/profile',
//         title: 'Perfil'
//     },
//     {
//         id: '2',
//         href: '/posts',
//         title: 'Posts'
//     },
//     {
//         id: '3',
//         href: '/biblioteca',
//         title: 'Biblioteca'
//     },
//     {
//         id: '4',
//         href: '/2022',
//         title: 'Propositos 2022'
//     },
//     {
//         id: '5',
//         href: '/pepe',
//         title: 'Pepe frog'
//     },
//     {
//         id: '6',
//         href: '/trades',
//         title: 'Trades'
//     }
// ]
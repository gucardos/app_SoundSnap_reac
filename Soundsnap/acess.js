// acess.js

import axios from 'axios';

// Função para autenticar e obter um token de acesso do Spotify
export async function acess() {
    let c_id = "c39f13e6b0b9496882f544f1a9456d7a";
    let c_sct = "b819c1e4cca44124bd66cbc9b5e74e79";

    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: c_id,
                client_secret: c_sct,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao obter token de acesso:", error);
        throw new Error("Erro ao obter token de acesso");
    }
}

// Nova função para buscar álbuns com base em um termo de pesquisa
export async function search_album(query) {
    try {
        // Obtém o token de acesso
        const token = await acess();
        const accessToken = token.access_token;

        // Realiza a pesquisa na API do Spotify
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=10&market=BR`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar álbuns:", error);
        throw error;
    }
}


// Função para buscar um álbum aleatório
export async function get_rand_album() {
    try {
        // Obtém o token de acesso
        const token = await acess();
        const accessToken = token.access_token;

        // Gera uma pesquisa aleatória
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
        let randomSearch = '';
        switch (Math.round(Math.random() * 2)) {
            case 0:
                randomSearch = randomCharacter + '%25';
                break;
            case 1:
                randomSearch = '%25' + randomCharacter + '%25';
                break;
            case 2:
                randomSearch = '%25' + randomCharacter;
        }

        let getRandomOffset = Math.floor(Math.random() * 999);
        const url = `https://api.spotify.com/v1/search?query=${randomSearch}&offset=${getRandomOffset}&limit=1&type=album&market=BR`;

        // Realiza a requisição com o token
        const result = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Verifica se a resposta foi bem-sucedida
        if (!result.ok) {
            throw new Error("Erro ao buscar dados do álbum");
        }

        // Retorna os dados do álbum
        const data = await result.json();
        return data;  // Retorna os álbuns encontrados
    } catch (error) {
        console.error("Erro ao buscar dados do álbum:", error);
        throw error;  // Propaga o erro
    }
}


// Função principal para buscar um álbum, chamada pelo item de álbum
export async function album_main() {
    try {
        const token = await acessWithCache(); // Obtém o token de acesso

        // Obtém o ID do álbum a partir da URL (usado no caso de buscas específicas)
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        if (!id) {
            throw new Error("ID do álbum não encontrado nos parâmetros da URL.");
        }

        console.log("ID do álbum:", id);
        
        // Aqui você pode implementar a lógica adicional para buscar detalhes do álbum

    } catch (error) {
        console.error("Erro na função principal de álbuns:", error);
    }
}

// Função para buscar as faixas de um álbum específico
export async function get_album_tracks(albumId) {
    try {
        // Obtém o token de acesso
        const token = await acess();
        const accessToken = token.access_token;

        // Realiza a requisição para buscar as faixas do álbum
        const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
        const result = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Verifica se a resposta foi bem-sucedida
        if (!result.ok) {
            throw new Error("Erro ao buscar faixas do álbum");
        }

        // Retorna os dados das faixas
        const data = await result.json();
        return data.items; // Retorna a lista de faixas
    } catch (error) {
        console.error("Erro ao buscar faixas do álbum:", error);
        throw error; // Propaga o erro
    }
}


// Função para buscar dados do perfil do usuário
export async function main_perfil() {
    try {
        const token = await acessWithCache(); // Obtém o token de acesso
        console.log("Token de autenticação recebido.");

        // Obtém o usuário a partir da URL
        const params = new URLSearchParams(window.location.search);
        const user = params.get("usuario");

        if (!user) {
            throw new Error("Usuário não encontrado nos parâmetros da URL.");
        }

        console.log("Usuário:", user);

        // Aqui você pode implementar a lógica para buscar dados do perfil
    } catch (error) {
        console.error("Erro na função principal de perfil:", error);
    }
}

// Exemplo de uso otimizado
(async () => {
    try {
        console.time("Tempo de requisição"); // Marca o tempo de execução

        const album = await get_rand_album(); // Busca o álbum aleatório
        console.log("Álbum aleatório otimizado:", album);

        console.timeEnd("Tempo de requisição"); // Marca o final do tempo de execução
    } catch (error) {
        console.error("Erro ao testar a API do Spotify:", error);
    }
})();

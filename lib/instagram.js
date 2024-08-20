import axios from 'axios';

const sesid = "14657018766%3AMeGdfyO2zxSD8Q%3A4";

export async function getUser(username) {
    try {
        const { data } = await axios.get(`https://www.instagram.com/${username}/?__a=1`, {
            headers: {
                Cookie: `sessionid=${sesid}`,
            },
        });
        const user = data.graphql.user;

        return {
            id: user.id,
            biography: user.biography,
            subscribersCount: user.edge_followed_by.count,
            subscribtions: user.edge_follow.count,
            fullName: user.full_name,
            highlightCount: user.highlight_reel_count,
            isBusinessAccount: user.is_business_account,
            isRecentUser: user.is_joined_recently,
            accountCategory: user.business_category_name,
            linkedFacebookPage: user.connected_fb_page,
            isPrivate: user.is_private,
            isVerified: user.is_verified,
            profilePic: user.profile_pic_url,
            profilePicHD: user.profile_pic_url_hd,
            username: user.username,
            postsCount: user.edge_owner_to_timeline_media.count,
            posts: user.edge_owner_to_timeline_media.edges.map(edge => {
                let hasCaption = edge.node.edge_media_to_caption.edges[0];
                return {
                    id: edge.node.id,
                    shortCode: edge.node.shortcode,
                    url: `https://www.instagram.com/p/${edge.node.shortcode}/`,
                    dimensions: edge.node.dimensions,
                    imageUrl: edge.node.display_url,
                    isVideo: edge.node.is_video,
                    caption: hasCaption ? hasCaption.node.text : '',
                    commentsCount: edge.node.edge_media_to_comment.count,
                    commentsDisabled: edge.node.comments_disabled,
                    timestamp: edge.node.taken_at_timestamp,
                    likesCount: edge.node.edge_liked_by.count,
                    location: edge.node.location,
                    children: edge.node.edge_sidecar_to_children ? edge.node.edge_sidecar_to_children.edges.map(edge => {
                        return {
                            id: edge.node.id,
                            shortCode: edge.node.shortcode,
                            dimensions: edge.node.dimensions,
                            imageUrl: edge.node.display_url,
                            isVideo: edge.node.is_video,
                        }
                    }) : []
                }
            }) || []
        };
    } catch (error) {
        console.error(error);
        return { status: 404 };
    }
}

export async function getPost(code) {
    if (!code) throw new Error('Argument "code" must be specified');

    try {
        const { data } = await axios.get(`https://www.instagram.com/p/${code}/?__a=1`, {
            headers: {
                Cookie: `sessionid=${sesid}`,
            },
        });
        const post = data.graphql.shortcode_media;
        const tipe = post.__typename;
        const anu = [];

        // Handle different types (GraphImage, GraphVideo, GraphSidecar)...

        return {
            media_id: post.id,
            shortcode: post.shortcode,
            text: post.accessibility_caption,
            capt: post.edge_media_to_caption.edges[0] ? post.edge_media_to_caption.edges[0].node.text : '',
            post: anu,
            owner_user: post.owner.username,
            date: post.taken_at_timestamp,
        };
    } catch (error) {
        console.error(error);
        return { status: 404 };
    }
}

export async function searchUser(query) {
    try {
        const { data } = await axios.get(`https://www.instagram.com/web/search/topsearch/?query=${query}`, {
            headers: {
                Cookie: `sessionid=${sesid}`,
            },
        });

        const all = data.users;
        const result = [];

        // Loop through data and populate result...

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function igstory(username) {
    try {
        const response = await axios({
            url: "https://www.instagramsave.com/",
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36",
            },
        });

        const token = String(require("cheerio").load(response.data)("#token").attr("value"));

        const [respon] = await Promise.all([
            axios({
                url: "https://www.instagramsave.com/system/action.php",
                method: "POST",
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36",
                    "cookie": response.headers["set-cookie"][0].split(";")[0],
                },
                data: new URLSearchParams(Object.entries({
                    url: `https://www.instagram.com/${username}`,
                    action: "story",
                    token: token,
                    json: "",
                })),
            }),
        ]);

        return respon.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
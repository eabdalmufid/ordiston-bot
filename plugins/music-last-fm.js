import fetch from "node-fetch"

let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    text,
    command,
    args
}) => {
    let Endspoint = ["artistEvents",
        "artistSearch",
        "artistTopFans",
        "artistTopTracks",
        "compareUserTaste",
        "compareUserToArtist",
        "eventAttendes",
        "eventInfo",
        "eventShout",
        "libraryAlbum",
        "libraryArtist",
        "libraryTracks",
        "metroArtistChart",
        "metroEvents",
        "metroHypeTrackChart",
        "metroTrackChart",
        "metros",
        "trackSearch",
        "trackSimilar",
        "trackTopFan",
        "userRecentTracks",
        "userRecommendedArtists",
        "userTopArtist",
        "userTopTracks",
        "userWeeklyArtistChart",
        "userWeeklyCharts",
        "userWeeklyTrackChart"
    ]
    if (!text) throw "Input Endspoint\nCth: .lastfm trackSearch.Believe\n\n" + "*[ ENDPOINT ]*\n" + await ArrClean(Endspoint)
    let [a, b, c] = text.split(/[xzXZ/i!#\$%\+£¢€¥\^°=¶∆×÷π√✓©®:;\?&\.\\\-]+/)

    if (a == "artistEvents") {
        m.reply(wait)
        let links = await artistEvents(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "artistSearch") {
        m.reply(wait)
        let links = await artistSearch(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "artistTopFans") {
        m.reply(wait)
        let links = await artistTopFans(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "artistTopTracks") {
        m.reply(wait)
        let links = await artistTopTracks(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "compareUserTaste") {
        m.reply(wait)
        let links = await compareUserTaste(b, c)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "compareUserToArtist") {
        m.reply(wait)
        let links = await compareUserToArtist(b, c)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "eventAttendes") {
        m.reply(wait)
        let links = await eventAttendes(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "eventInfo") {
        m.reply(wait)
        let links = await eventInfo(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "eventShout") {
        m.reply(wait)
        let links = await eventShout(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "libraryAlbum") {
        m.reply(wait)
        let links = await libraryAlbum(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "libraryArtist") {
        m.reply(wait)
        let links = await libraryArtist(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "libraryTracks") {
        m.reply(wait)
        let links = await libraryTracks(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "metroArtistChart") {
        m.reply(wait)
        let links = await metroArtistChart(b, c)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "metroEvents") {
        m.reply(wait)
        let links = await metroEvents(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "metroHypeTrackChart") {
        m.reply(wait)
        let links = await metroHypeTrackChart(b, c)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "metroTrackChart") {
        m.reply(wait)
        let links = await metroTrackChart(b, c)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "metros") {
        m.reply(wait)
        let links = await metros(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "trackSearch") {
        m.reply(wait)
        let links = await trackSearch(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "trackSimilar") {
        m.reply(wait)
        let links = await trackSimilar(b, c)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "trackTopFan") {
        m.reply(wait)
        let links = await trackTopFan(b, c)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "userRecentTracks") {
        m.reply(wait)
        let links = await userRecentTracks(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "userRecommendedArtists") {
        m.reply(wait)
        let links = await userRecommendedArtists(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "userTopArtist") {
        m.reply(wait)
        let links = await userTopArtist(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "userTopTracks") {
        m.reply(wait)
        let links = await userTopTracks(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "userWeeklyArtistChart") {
        m.reply(wait)
        let links = await userWeeklyArtistChart(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "userWeeklyCharts") {
        m.reply(wait)
        let links = await userWeeklyCharts(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }
    if (a == "userWeeklyTrackChart") {
        m.reply(wait)
        let links = await userWeeklyTrackChart(b)
        let imge = await (await fetch(links)).json()
        throw imge
    }

}
handler.help = ["lastfm"]
handler.tags = ["music"]
handler.command = /^(lastfm)$/i
export default handler

function ArrClean(str) {
    return str.map((v, index) => ++index + ". " + v).join('\r\n')
}

// Set the API method and parameters
var apiKey = "aac9268580d78ff419b26625d1150db3"
var apiUrl = "https://ws.audioscrobbler.com/2.0/"

function userRecentTracks(username) {
    return apiUrl + "?method=user.getrecenttracks&user=" + username + "&api_key=" + apiKey + "&format=json"
}

function userTopTracks(username) {
    return apiUrl + "?method=user.gettoptracks&user=" + username + "&api_key=" + apiKey + "&format=json"
}

function userRecommendedArtists(username) {
    return apiUrl + "?method=user.getRecommendedArtists&user=" + username + "&api_key=" + apiKey + "&format=json"
}

function userTopArtist(username) {
    return apiUrl + "?method=user.gettopartists&user=" + username + "&api_key=" + apiKey + "&limit=100&format=json"
}

function userWeeklyCharts(username) {
    return apiUrl + "?method=user.getweeklychartlist=" + username + "&api_key=" + apiKey + "&format=json"
}

function userWeeklyTrackChart(username) {
    return apiUrl + "?method=user.getweeklytrackchart=" + username + "&api_key=" + apiKey + "&format=json"
}

function userWeeklyArtistChart(username) {
    return apiUrl + "?method=user.getweeklyartistchart=" + username + "&api_key=" + apiKey + "&format=json"
}

//Last.fm Tracks Methods
function trackSearch(trackName) {
    return apiUrl + "?method=track.search&track=" + trackName + "&api_key=" + apiKey + "&format=json"
}

function trackTopFan(artist, trackName) {
    return apiUrl + "?method=track.gettopfans&artist=" + artist + "&track=" + trackName + "&api_key=" + apiKey + "=json"
}

function trackSimilar(artist, trackName) {
    //Must Pass artist, trackName and apiKey
    return apiUrl + "?method=track.getsimilar&artist=" + artist + "&track=" + trackName + "&api_key=" + apiKey + "=json"
}


//User Tastes methods
function compareUserTaste(user1, user2) {
    return apiUrl + "?method=tasteometer.compare&type1=user&type2=user&value1=" + user1 + "&value2=" + user2 + "&api_key=" + apiKey + "&format=json"
}

function compareUserToArtist(artist, user) {
    return apiUrl + "?method=tasteometer.compare&type1=artists&type2=user&value1=" + artist + "&value2=" + user + "&api_key=" + apiKey + "&format=json"
}

function libraryTracks(user) {
    return apiUrl + "?method=library.gettracks&api_key=" + apiKey + "&user=" + user + "&format=json"
}

function libraryArtist(user) {
    return apiUrl + "?method=library.getartist&api_key=" + apiKey + "&user=" + user + "&format=json"
}

function libraryAlbum(user) {
    return apiUrl + "?method=library.getalbums&api_key=" + apiKey + "&user=" + user + "&format=json"
}

// Get Metro Areas 
function metros(country) {
    return apiUrl + "?method=geo.getmetros&country=" + country + "&api_key=" + apiKey + "&format=json"
}

function metroHypeTrackChart(metro, country) {
    return apiUrl + "?method=geo.getmetrohypetrackchart&country=" + country + "&metro=" + metro + "&api_key=" + apiKey + "&format=json"
}

function metroEvents(metro) {
    return apiUrl + "?method=geo.getevents&location=" + metro + "&api_key=" + apiKey + "&format=json"
}

function metroArtistChart(metro, country) {
    return apiUrl + "?method=geo.getmetroartistchart&country=" + country + "&metro=" + metro + "&api_key=" + apiKey + "&format=json"
}

function metroTrackChart(metro, country) {
    return apiUrl + "?method=geo.getmetrotrackchart&country=" + country + "&metro=" + metro + "&api_key=" + apiKey + "&format=json"
}

function eventInfo(eventId) {
    return apiUrl + "?method=event.getinfo&event=" + eventId + "&api_key=" + apiKey + "=json"
}

function eventAttendes(eventId) {
    return apiUrl + "?method=event.getattendees&event=" + eventId + "&api_key=" + apiKey + "=json"
}

function eventShout(eventId) {
    return apiUrl + "?method=event.getshouts&event=" + eventId + "&api_key=" + apiKey + "=json"
}

//Artist Methods
function artistSearch(artist) {
    return apiUrl + "?method=artist.search&artist=" + artist + "&api_key=" + apiKey + "&format=json"
}

function artistTopTracks(artist) {
    return apiUrl + "?method=artist.gettoptracks&artist=" + artist + "&api_key=" + apiKey + "&format=json"
}

function artistTopFans(artist) {
    return apiUrl + "?method=artist.gettopfans&artist=" + artist + "&api_key=" + apiKey + "&format=json"
}

function artistEvents(artist) {
    return apiUrl + "?method=artist.getevents&artist=" + artist + "&api_key=" + apiKey + "&format=json"
}
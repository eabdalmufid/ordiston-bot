import fetch from 'node-fetch';
import moment from 'moment';

class Frinkiac {
    async searchMaker(query, caption) {
        try {
            const search = await this.search(query);
            if (!search) return 'Could not find any results.';
            const data = await this.fetchCaption(search.Episode, search.Timestamp);
            const time = moment.duration(data.Frame.Timestamp, 'seconds').humanize();
            let url = `https://frinkiac.com/meme/${data.Frame.Episode}/${data.Frame.Timestamp}.jpg`;
            url += `?b64lines=${Buffer.from(caption).toString('base64')}`;
            const seasonEpisode = `S${data.Episode.Season}E${data.Episode.EpisodeNumber}`;
            return {
                episode: seasonEpisode,
                time: time,
                title: data.Episode.Title,
                season: data.Episode.Season,
                director: data.Episode.Director,
                writer: data.Episode.Writer,
                airDate: data.Episode.OriginalAirDate,
                url: url
            }
        } catch (err) {
            return `Oh no, an error occurred: \`${err.message}\`. Try again later!`;
        }
    }

    async maker(ep, ts, caption) {
        try {
            const data = await this.fetchCaption(ep, ts);
            const time = moment.duration(data.Frame.Timestamp, 'seconds').humanize();
            let url = `https://frinkiac.com/meme/${data.Frame.Episode}/${data.Frame.Timestamp}.jpg`;
            url += `?b64lines=${Buffer.from(caption).toString('base64')}`;
            const seasonEpisode = `S${data.Episode.Season}E${data.Episode.EpisodeNumber}`;
            return {
                episode: seasonEpisode,
                time: time,
                title: data.Episode.Title,
                season: data.Episode.Season,
                director: data.Episode.Director,
                writer: data.Episode.Writer,
                airDate: data.Episode.OriginalAirDate,
                url: url
            }
        } catch (err) {
            return `Oh no, an error occurred: \`${err.message}\`. Try again later!`;
        }
    }

    async search(query) {
        const response = await fetch(`https://frinkiac.com/api/search?q=${encodeURIComponent(query)}`);
        const body = await response.json();
        if (!body.length) return null;
        return body[0];
    }

    async fetchCaption(ep, ts) {
        const response = await fetch(`https://frinkiac.com/api/caption?e=${ep}&t=${ts}`);
        const body = await response.json();
        return body;
    }
}

export default Frinkiac;
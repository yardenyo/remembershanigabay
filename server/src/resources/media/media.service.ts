import Media from '@/resources/media/media.interface';
import MediaModel from '@/resources/media/media.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';

class MediaService {
    private media = MediaModel;

    public async getAllMedia(body: PostBody): Promise<{
        media: Media[];
        count: number;
    }> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            let media;

            media = await this.media
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            const count = await this.media.countDocuments();

            return { media, count };
        } catch (error) {
            throw new Error('שגיאה בטעינת מדיה');
        }
    }

    public async getMediaById(id: string): Promise<Media> {
        try {
            const media = await this.media.findById(id);
            if (!media) throw new Error();

            return media;
        } catch (error) {
            throw new Error('שגיאה בטעינת מדיה');
        }
    }

    public async createMedia(body: PostBody): Promise<Media> {
        try {
            const media = await this.media.create({
                ...body,
            });

            await media.save();

            return media;
        } catch (error) {
            throw new Error('שגיאה ביצירת מדיה');
        }
    }

    public async updateMedia(id: string, body: PostBody): Promise<Media> {
        try {
            const media = await this.media.findByIdAndUpdate(id, {
                ...body,
            });

            if (!media) throw new Error();

            await media.save();

            return media;
        } catch (error) {
            throw new Error('שגיאה בעדכון מדיה');
        }
    }

    public async deleteMedia(id: string): Promise<void> {
        try {
            await this.media.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('שגיאה במחיקת מדיה');
        }
    }
}

export default MediaService;

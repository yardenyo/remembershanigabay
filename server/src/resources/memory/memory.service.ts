import Memory from '@/resources/memory/memory.interface';
import MemoryModel from '@/resources/memory/memory.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';

class MemoryService {
    private memory = MemoryModel;

    public async getAllMemories(body: PostBody): Promise<{
        memories: Memory[];
        count: number;
    }> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const memories = await this.memory
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            const count = await this.memory.countDocuments();

            return { memories, count };
        } catch (error) {
            throw new Error('שגיאה בטעינת זיכרונות');
        }
    }

    public async getMemoryById(id: string): Promise<Memory> {
        try {
            const memory = await this.memory.findById(id);
            if (!memory) throw new Error();

            return memory;
        } catch (error) {
            throw new Error('שגיאה בטעינת זיכרון');
        }
    }

    public async createMemory(body: PostBody): Promise<Memory> {
        try {
            const memory = await this.memory.create({
                ...body,
            });

            await memory.save();

            return memory;
        } catch (error) {
            throw new Error('שגיאה ביצירת זיכרון');
        }
    }

    public async updateMemory(id: string, body: PostBody): Promise<Memory> {
        try {
            const memory = await this.memory.findByIdAndUpdate(id, {
                ...body,
            });

            if (!memory) throw new Error();

            await memory.save();

            return memory;
        } catch (error) {
            throw new Error('שגיאה בעדכון זיכרון');
        }
    }

    public async deleteMemory(id: string): Promise<Memory> {
        try {
            const memory = await this.memory.findByIdAndDelete(id);

            if (!memory) throw new Error();

            return memory;
        } catch (error) {
            throw new Error('שגיאה במחיקת זיכרון');
        }
    }
}

export default MemoryService;

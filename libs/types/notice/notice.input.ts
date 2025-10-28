import { NoticeCategory } from "../../enums/notice.enum";


export interface NoticeInput {
    noticeCategory: NoticeCategory;
    noticeTitle: string;
    noticeContent: string;
}

interface NISearch {
    noticeCategory?: NoticeCategory;
}

export interface NoticesInquiry {
    page: number;
    limit: number;
    search: NISearch;
}
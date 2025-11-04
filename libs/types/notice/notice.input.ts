import { NoticeCategory, NoticeStatus } from "../../enums/notice.enum";


export interface NoticeInput {
    noticeCategory: NoticeCategory;
    noticeStatus: NoticeStatus;
    noticeTitle: string;
    noticeContent: string;
}

interface NISearch {
    noticeCategory: NoticeCategory;
    noticeStatus?: NoticeStatus;
    text?: string;
}

export interface NoticesInquiry {
    page: number;
    limit: number;
    search: NISearch;
}
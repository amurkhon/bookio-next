import { NoticeCategory, NoticeStatus } from "../../enums/notice.enum";


export interface NoticeInput {
    noticeCategory: NoticeCategory;
    noticeTitle: string;
    noticeContent: string;
}

interface NISearch {
    noticeCategory: NoticeCategory;
    noticeStatus?: NoticeStatus;
}

export interface NoticesInquiry {
    page: number;
    limit: number;
    search: NISearch;
}
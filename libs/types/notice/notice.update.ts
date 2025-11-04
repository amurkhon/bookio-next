import { NoticeCategory, NoticeStatus } from "../../enums/notice.enum";


export interface NoticeUpdate {
    _id: string;
    noticeStatus: NoticeStatus;
    noticeCategory: NoticeCategory;
    noticeTitle?: string;
    noticeContent?: string;
    memberId?: string;
}
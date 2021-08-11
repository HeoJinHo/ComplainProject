"use strict";

/**
 * 상품 불러오기 팝업에서 선택한 상품 세팅.
 * @param fileID
 * @param fileName
 * @param goodsName
 * @param goodsPrice
 * @param goodsUseTax
 */
var setGoodsInfo = function (fileID, fileName, goodsName, goodsPrice, goodsUseTax) {
    const images = [];

    //이미지 파일 세팅
    if(fileID && fileName) {
        const imageFile = {
            fileName : fileName,
            attachFileID : fileID,
            needUpload : true
        };
        images.push(imageFile);
    }

    vm.images = images;
    vm.data.goodsName = goodsName;
    vm.data.goodsPrice = goodsPrice;
    vm.data.taxType = goodsUseTax ? 'TAX' : 'FREE';
}

Vue.filter('numComma', function (number) {
    if(number == null || !$.isNumeric(number))
        return "";

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

/**
 * VUE 인스턴스 생성 및 렌더링 적용.
 * @type {Vue}
 */
const vm = new Vue({
    el: '#linkApp',
    data : function () {
        return {
            //링크결제 등록,수정 데이터
            data : {
                //상품명
                goodsName : null,
                //상품가격
                goodsPrice : null,
                //할인율 사용여부
                useDiscount : false,
                //할인율 퍼센트
                discountPercent : null,
                //상품 url
                goodsUrl : null,
                //상품 설명
                goodsDescription : null,
                //업로드 이미지 데이터 리스트
                imageFiles : null,
                //과세,면세 타입
                taxType : defaultTaxType,
                //결제완료 내용
                paymentCompleteStr : null,
                //구매자 결제메모 표시 여부
                usePayMemoToSeller : false,
                //구매자 결제메모 필수값 적용 여부
                requiredPayMemo : false,
                //구매자 결제메모 placeHolder 문구
                payMemoPlaceholder : null,
                //구매자 가격입력허용 여부
                usePriceInput : false,
                //구매자 이름 요청 여부
                useBuyerName : false,
                //구매자 주소 요청 여부
                useAddr : false,
                //재고
                stockInfo : {
                    use : false,
                    stockCnt : null,
                },
                //구매 수량
                buyAmount : {
                    use : false,
                    minAmount : null,
                    maxAmount : null
                },
                //배송요금
                deliveryPrice : {
                    use : false,
                    price : null,
                    useFree : false,
                    conditionalFreePrice : null
                },
            },
            //할인율 퍼센트 리스트 (selectBox option 으로 세팅)
            discountPercents : [],
            //이미지 리스트
            images : [],
            //등록인지 수정인지
            isInsert : mode === 'regist',
            //수정 데이터 ID
            modifyData : modifyData
        }
    },
    created : function() {
        for (var i = 5; i <= 95; i+=5)
            this.discountPercents.push(i);

        //수정 데이터 세팅
        if(!this.isInsert && modifyData) {
            const goods = modifyData.goodsInfos[0];
            this.data.goodsName = goods.goodsName;
            this.data.goodsPrice = goods.priceInfo.goodsPrice;
            this.data.useDiscount = goods.priceInfo.useDiscount;
            this.data.discountPercent = goods.priceInfo.discountPercent||null;
            this.data.goodsUrl = goods.goodsUrl||null;
            this.data.goodsDescription = goods.goodsDescription;

            if(goods.stockInfo)
                this.data.stockInfo = goods.stockInfo;

            if(goods.buyAmount)
                this.data.buyAmount = goods.buyAmount;

            if(goods.deliveryPrice)
                this.data.deliveryPrice = goods.deliveryPrice;

            if(goods.imgAttachFiles && goods.imgAttachFiles.length > 0) {
                for (let i = 0; i < goods.imgAttachFiles.length; i++)
                    this.images.push(goods.imgAttachFiles[i]);
            }

            if(modifyData.taxType)
                this.data.taxType = modifyData.taxType;

            this.data.paymentCompleteStr = modifyData.paymentCompleteStr||null;
            this.data.usePayMemoToSeller = modifyData.usePayMemoToSeller;
            this.data.requiredPayMemo = modifyData.requiredPayMemo;
            this.data.payMemoPlaceholder = modifyData.payMemoPlaceholder||null;
            this.data.usePriceInput = modifyData.usePriceInput;
            this.data.useBuyerName = modifyData.useBuyerName;
            this.data.useAddr = modifyData.useAddr;
        }

    },
    methods : {
        //이미지 파일 선택
        selectImageFile : function (event) {
            const file = event.target.files[0];
            event.target.value = null;

            //파일 유효성 체크
            if(!this.checkFile(file))
                return;

            const images = this.images;

            //파일 데이터 base64로 변환
            fileLib.convertBase64(file, function (base64) {
                images.push({
                    fileName : file.name,
                    encodeBase64 : base64,
                    type : file.type,
                    needUpload : true
                })
            }, function(error) {
                alert("파일 선택 실패.");
            });
        },

        //이미지 파일 유효성 체크
        checkFile : function (file) {

            //이미지 파일인지 체크
            if(!fileLib.isImgFile(file.name)) {
                alert('이미지 파일만 선택해 주세요.\n선택 파일 : ' + file.name);
                return false;
            }

            //파일 사이즈 5 메가바이트 제한
            if(!fileLib.checkFileSizeOver(file.size, 5)) {
                alert('파일 사이즈는 5MB 이하로 선택해주세요.\n선택 파일 : ' + fileLib.calByteUnit(file.size));
                return false;
            }

            return true;
        },

        //이미지 삭제
        deleteImage(index) {
            if(confirm("이미지를 삭제하시겠습니까?")) {

                //서버에 등록되어있는 파일이면 서버로 삭제 요청
                if (this.images[index].fileID) {
                    const images = this.images;
                    axios.delete(this.modifyData.id+'/goods/img-attach-files/'+index).then(function () {
                        images.splice(index, 1);
                    });
                } else {
                    this.images.splice(index, 1);
                }
            }
        },

        submit() {
            //필수값 체크
            try {
                this.requiredValueCheck();
            } catch (e) {
                alert(e.msg);
                $("#"+e.id).focus();
                return;
            }

            //업로드할 이미지 데이터 세팅
            this.data.imageFiles = [];
            if(this.images.length > 0) {
                for (let i = 0; i < this.images.length; i++) {
                    if (this.images[i].needUpload)
                        this.data.imageFiles.push(this.images[i]);
                }
            }

            const successFunc = function (res) {
                alert(res.data.message);
                if (res.data.success === "Y")
                    location.href = '/se/paymentLink/list';
            };

            const errorFunc = function (error) {
                if (error.response)
                    alert(error.response.status);
                else
                    alert(error);
            };

            if(this.isInsert) {
                //등록
                axios.post('/se/paymentLink/regist', this.data).then(successFunc).catch(errorFunc);
            } else {
                //수정
                axios.put('/se/paymentLink/modify/'+this.modifyData.id, this.data).then(successFunc).catch(errorFunc);
            }
        },

        requiredValueCheck : function () {
            if(isStrNull(this.data.goodsName))
                throw {msg : '상품명을 입력해주세요.', id : 'goodsName'};

            const totalPrice = this.totalPrice;
            if(totalPrice < 1000 || totalPrice > 99999999)
                throw {msg : '합계 결제금액을 1,000 ~ 99,999,999원 사이로 설정해 주세요.', id : 'goodsPrice'};

            if(this.data.useDiscount && !this.data.discountPercent)
                throw {msg : '할인율을 선택해주세요.', id : 'discountPercent'};

            if(this.data.deliveryPrice.use && !this.data.deliveryPrice.price)
                throw {msg : '배송요금을 입력해주세요.', id : 'deliveryPrice'};

            if(this.data.deliveryPrice.useFree && !this.data.deliveryPrice.conditionalFreePrice)
                throw {msg : '조건부 무료배송 지정금액을 입력해주세요.', id : 'conditionalFreePrice'};

            if(isStrNull(this.data.goodsDescription))
                throw {msg : '상품 설명을 입력해주세요.', id : 'goodsDescription'};

            /*if(!isStrNull(this.data.goodsUrl) && !validate.checkHttpUrl(this.data.goodsUrl))
                throw {msg : '상품 안내 URL을 형식에 맞게 입력해주세요.', id : 'goodsUrl'};*/

            if(this.data.buyAmount.use) {
                if(!this.data.buyAmount.minAmount || this.data.buyAmount.minAmount < 1)
                    throw {msg : '구매 최소 수량을 1개 이상 입력해주세요.', id : 'minAmount'};
                else if(!this.data.buyAmount.maxAmount || this.data.buyAmount.maxAmount < 1)
                    throw {msg : '구매 최대 수량을 1개 이상 입력해주세요.', id : 'maxAmount'};
                else if(this.data.buyAmount.minAmount > this.data.buyAmount.maxAmount)
                    throw {msg : '구매 최대 수량이 최소 수량보다 크게 입력해주세요.', id : 'maxAmount'};
            }

            if(this.data.stockInfo.use && !this.data.stockInfo.stockCnt)
                throw {msg : '재고 수량을 입력해주세요.', id : 'stockCnt'};
        },
    },
    computed : {
        //할인된 금액
        discountedPrice : function () {
            if(this.data.useDiscount && this.data.discountPercent && this.data.goodsPrice) {
                //부동소수점 계산에 따라 부정확한 수가 나올 수 있기때문에 소수점 둘째자리이후로는 버림.
                var percent = parseInt((0.01 * this.data.discountPercent) * 100) / 100;
                return this.data.goodsPrice - Math.ceil(this.data.goodsPrice * percent);
            }

            return this.data.goodsPrice||0;
        },
        //배송 요금
        deliveryPrice : function () {
            return this.data.deliveryPrice.use ? this.data.deliveryPrice.price||0 : 0;
        },
        //합계 금액
        totalPrice : function() {
            return +this.discountedPrice + +this.deliveryPrice;
        }
    }
});
